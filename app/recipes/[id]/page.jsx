"use client"
import { useRecipes } from "@/app/hook/useRecipes"
import Navbar from "@/components/Navbar"
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
      <div>
        <div className="sticky top-0 bg-customYellow z-50 mb-20">
          <Navbar />
        </div>
        
      
        <div className="font-sans mx-[100px]">
           <h1 className="font-serif text-[60px]">{title}</h1>
           <h1 className="font-normal font-sans text-[18px] mb-4">Created by: {author}</h1>
           <div className="border-b-1 border-customDarkGreen"></div>
           <section className="flex flex-col items-center justify-center gap-6 mt-[50px] mb-4">
              <p 
                    className="text-[18px] align-left" 
                    dangerouslySetInnerHTML={{ __html: description }} 
                  />
              <img
                src={recipeImage}
                className="rounded-small w-[900px] h-auto mb-4" 
                alt="Recipe"
              />
              
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Ingredients and Instructions */}
            <div>
              {/* Ingredients Section */}
              <h1 className="font-[700] font-serif text-[25px] my-2">Ingredients</h1>
              <ul className="pl-5 space-y-3">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center text-[18px]">
                    <span 
                      className="mr-3 w-5 h-5 flex items-center justify-center border-2 border-gray-500 rounded-full"
                    ></span>
                    <span 
                      className={`${ingredient.completed ? 'line-through text-gray-400' : ''}`}
                    >
                      {ingredient.amount} {ingredient.unit} of {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Instructions Section */}
              <div className="mt-8">
                <h1 className="font-[700] font-serif text-[25px]">Instructions</h1>
                {instruction.map((instruction, index) => (
                  <div key={index} className="mt-4">
                    <ol>
                      {instruction.steps.map((step) => (
                        <li key={step.number} className="flex items-start gap-4 mb-4">
                          {/* Step Number */}
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full font-bold">
                              {step.number}
                            </div>
                          </div>
                          {/* Step Text */}
                          <div className="flex-grow">
                            <p className=" text-gray-800 leading-relaxed text-[18px]">{step.step}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>

          </div>

            {/* Right Column: Similar Recipes */}
            <div>
              <h2 className="font-[700] font-serif text-[25px] mb-4">Similar Recipes</h2>
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
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
          </div>

            {/* <div className="flex flex-row">
                <p className="mr-3">Prep time: {prepTime}</p>
                <p className="mr-3">Ingredients: {numberOfIngredients}</p>
                <p>Calories: {calories}</p>
            </div>
            
            <div>
                <h1 className="font-[700] font-serif text-[25px] my-2">Ingredients</h1>
                <ul className="pl-5 space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center">
                      <span 
                        className="mr-3 w-5 h-5 flex items-center justify-center border-2 border-gray-500 rounded-full"
                      ></span>
                      <span 
                        className={`${ingredient.completed ? 'line-through text-gray-400' : ''}`}
                      >
                        {ingredient.amount} {ingredient.unit} of {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>

            </div>

            <div>
                <h1 className="font-[700] font-serif text-[25px] my-2">Instructions</h1>
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
                
            </div> */}

            <div>
                <h2 className="font-[700] font-serif text-[25px] mt-6 mb-2">Recipe Tags</h2>
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
      {/* <div className="mt-8">
        <h2 className="font-[700] font-serif text-[25px] mb-2">Similar Recipes</h2>
                    
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-40 gap-y-20">
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
      </div> */}

      {/* Reviews List */}
      <div>
        <h3 className="font-[700] font-serif text-[25px] my-2">Reviews</h3>
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
      </div>
    )
}