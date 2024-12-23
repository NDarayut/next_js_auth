"use client"
import { useRecipes } from "@/app/hook/useRecipes"
import RecipeCard from "@/components/RecipeCard"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function RecipeDetail({params}){
    
    const {id}  = params
    const {data: session} = useSession()
    console.log(id) // debug to see if ID is defined
    const {recipeDetail, loading, error, fetchRecipeById} = useRecipes()
    const [similarRecipes, setSimilarRecipes] = useState([])

    const [reviews, setReviews] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(5);
    const [errors, setError] = useState("");
    
    useEffect(() =>{

        // Fetch related recipe
        async function fetchSimilarRecipes() {
            const response = await fetch(`/api/recipes/getsimilar/${id}`)
            const data = await response.json()
            setSimilarRecipes(data)
        }

        // Fetch reviews for the recipe
        async function fetchReviews() {
          const res = await fetch(`/api/recipes/${id}/reviews`);
          const data = await res.json();
          setReviews(data);
       
        }

        fetchReviews();
        fetchRecipeById(id)  
        fetchSimilarRecipes()
    }, [id])


    async function handleSubmit(e) {
        e.preventDefault();

        if (!session?.user) {
            setError("You must be logged in to post a review.");
            return;
          }
    
        if (!newComment || !newRating) {
          setError("Rating and comment are required.");
          return;
        }
    
        try {
          const res = await fetch(`/api/recipes/${id}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: session.user.id, // Replace with actual user ID from authentication
                rating: newRating,
                comment: newComment,
            }),
          });

          console.log(res)
    
          if (!res.ok) {
            throw new Error("Failed to submit review.");
          }
    
          const newReview = await res.json();
          setReviews((prev) => [...prev, newReview]);
          setNewComment("");
          setNewRating(5);
          setError("");
        } catch (errors) {
          console.error(errors);
          setError("Failed to submit review.");
        }
      }

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error: {error}</p>
    }

    if (!recipeDetail) {
        // Fallback in case recipeDetail is still null
        return <p>No recipe details available.</p>;
    }

    const title = recipeDetail.title
    const author = recipeDetail.sourceName
    const description = recipeDetail.summary
    const recipeImage = recipeDetail.image
    const prepTime = recipeDetail.readyInMinutes
    const calories = recipeDetail.nutrition?.nutrients?.find( (nutrient) => nutrient.name === "Calories")?.amount
    const numberOfIngredients = recipeDetail.extendedIngredients?.length
    const ingredients = recipeDetail.extendedIngredients
    const instruction = recipeDetail.analyzedInstructions
    const tags = {
        dishTypes: recipeDetail.dishTypes || [],
        cuisines: recipeDetail.cuisines || [],
        occasions: recipeDetail.occasions || [],
    }

    return(
        <div className="font-kodchasan px-[120px]">
           <h1 className="font-[500] text-[60px]">{title}</h1>
           <h1 className="font-[1000] text-[18px]">Created by: {author}</h1>
           <section>
            <p className="text-[20px]" dangerouslySetInnerHTML={{__html:description}} />
           </section>
           
           <img 
            src={recipeImage}
            className="w-[400px] h-full object-cover"/>
            <div className="flex flex-row">
                <p className="mr-3">Prep time: {prepTime}</p>
                <p className="mr-3">Ingredients: {numberOfIngredients}</p>
                <p>Calories: {calories}</p>
            </div>
            
            <div>
                <h1 className="font-[700] text-[25px] my-2">Ingredients</h1>
                <ul className="list-disc pl-5">
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.amount} {ingredient.unit} of {ingredient.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h1 className="font-[700] text-[25px] my-2">Instructions</h1>
                {instruction.map((instruction, index) => (
                    <div key={index}>
                    <ol>
                        {instruction.steps.map((step) => (
                        <li key={step.number}>
                            <span className="font-bold">Step {step.number}:</span> {" "}
                            <span dangerouslySetInnerHTML={{ __html: step.step }}/>
                        </li>
                        ))}
                    </ol>
                    </div>
                ))}
                
            </div>
            
            <div>
                <h2 className="font-[700] text-[25px] my-2">Recipe Tags</h2>
                <div className="flex flex-wrap gap-2">
                    {tags.dishTypes.map((tag, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 bg-customGreen text-white text-sm font-semibold rounded-full"
                    >
                        {tag}
                    </span>
                    ))}

                    {tags.cuisines.map((tag, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 bg-customGreen text-white text-sm font-semibold rounded-full"
                    >
                        {tag}
                    </span>
                    ))}

                    {tags.occasions.map((tag, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 bg-customGreen text-white text-sm font-semibold rounded-full"
                    >
                        {tag}
                    </span>
                    ))}
                    
                </div>
            </div>

            {/* Similar Recipes Section */}
          <div className="mt-8">
            <h2 className="font-[700] text-[25px] mb-2">Similar Recipes</h2>
                        
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-40 gap-y-20">
              {similarRecipes.length > 0 ? (
                similarRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipeId={recipe.id}
                    src={recipe.image} // Image URL
                    title={recipe.title} // Recipe title
                    isFavorited={false} // Pass favorite status
                  />
                ))
              ) : (
                !loading && <p>No similar recipes found.</p>
              )}
            </div>
          </div>

          {/* Reviews List */}
          <div>
            <h3 className="font-[700] text-[25px] my-2">Reviews</h3>
            {reviews.map((review) => (
              <div key={review._id} className="review">
                <p><strong>{review.userId?.username || "Anonymous"}</strong></p>
                <p>Rating: {review.rating}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Average Rating */}
          <h2>
            Average Rating:{" "}
            {reviews.length > 0
              ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
              : "No ratings yet"}
          </h2>

          {/* Add Review Form */}
          <form onSubmit={handleSubmit}>
            <h3>Add a Review</h3>
            {errors && <p style={{ color: "red" }}>{errors}</p>}
            <div>
              <label>Rating:</label>
              <select
                value={newRating}
                onChange={(e) => setNewRating(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Comment:</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <button type="submit">Submit Review</button>
          </form>
           
        </div>
    )
}