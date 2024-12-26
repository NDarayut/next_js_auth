"use client"
import { useRecipes } from "@/app/hook/useRecipes"
import Navbar from "@/components/Navbar"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import RelatedCard from "../components/RelatedCard"
import NutritionalFacts from "../components/NutritionalFacts"
import { motion } from "framer-motion";

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
            console.log("Similar recipe: ", data)
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
                username: session.user.username,
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
    const calories = recipeDetail.nutrition?.find( (nutrient) => nutrient.name === "Calories")?.amount
    const numberOfIngredients = recipeDetail.extendedIngredients?.length
    const ingredients = recipeDetail.extendedIngredients
    const instruction = recipeDetail.analyzedInstructions
    const tags = {
        dishTypes: recipeDetail.dishTypes || [],
        cuisines: recipeDetail.cuisines || [],
        occasions: recipeDetail.occasions || [],
        diets: recipeDetail.diets || [],
    }

    return(
      <div className="bg-customYellow min-h-screen">
        <div className="sticky top-0 bg-customYellow z-50 mb-28">
          <Navbar />
        </div>
        
        
        <div className="font-sans mx-[100px]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}  // Start hidden and offset from the bottom
            animate={{ opacity: 1, y: 0 }}    // Animate to visible and no offset
            transition={{ duration: 0.8 }}    // Duration of animation
          >
            <h1 className="font-serif text-[60px] mb-4">{title}</h1>
            <h1 className="font-normal font-sans text-[18px] mb-4">Created by: {author}</h1>
            <div className="border-b-1 border-customDarkGreen" />
            <section className="flex flex-col items-center justify-center gap-6 mt-[50px]">
                <p 
                      className="text-[18px] align-left mb-[50px]" 
                      dangerouslySetInnerHTML={{ __html: description }} 
                />
                <img
                  src={recipeImage}
                  className="rounded-small w-[900px] h-auto mb-4" 
                  alt="Recipe"
                />
                
            </section>
          </motion.div>

          <div className="flex flex-row gap-8 text-18 mt-[50px]">
            <div className="flex flex-col font-light">
              PREP TIME 
              <div className="text-customDarkGreen font-bold">
                {prepTime} MIN
              </div>
            </div>

            <div className="border-r-1 border-customGreen"/>

            <div className="flex flex-col font-light">
              INGREDIENTS: 
              <div className="text-customDarkGreen font-bold">
                {numberOfIngredients}
              </div>
            </div>

            <div className="border-r-1 border-customGreen"/>

            <div className="flex flex-col font-light">
              CALORIES: 
              <div className="text-customDarkGreen font-bold">
                {calories} kcal
              </div>

            </div>
          </div>

          <div className="grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr] gap-8 mt-[50px]">
            {/* Left Column: Ingredients and Instructions */}
            <div className="border-r-1 border-customDarkGreen border-opacity-45 pr-11">
              {/* Ingredients Section */}
              <h1 className="font-[700] font-serif text-[25px] my-2">Ingredients</h1>
              <ul className="pl-5 space-y-3">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center text-[18px]">
                    <span 
                      className="mr-3 w-5 h-5 flex items-center justify-center border-2 border-gray-500 rounded-full"
                    />
                    <span className={`${ingredient.completed ? 'line-through text-gray-400' : ''}`}>
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
              
              <NutritionalFacts nutrition={recipeDetail?.nutrition} />

              <h2 className="font-[700] font-serif text-[25px] mb-4 mt-12">Similar Recipes</h2>
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              <div className="overflow-y-auto max-h-[700px] grid grid-cols-1 gap-x-6 gap-y-8" style={{ scrollBehavior: "smooth" }}>
                {similarRecipes.length > 0 ? (
                  similarRecipes.map((recipe) => (
                    <RelatedCard
                      key={recipe._id}
                      recipeId={recipe._id}
                      src={recipe.image} // Image URL
                      title={recipe.title} // Recipe title
                      rating={recipe.score}
                      nutrition={{
                        calories: 250,
                        fat: 10,
                        sodium: 200,
                        protein: 15,
                        carbohydrates: 30,
                      }}
                    />
                  ))
                ) : (
                  !loading && <p>No similar recipes found.</p>
                )}
              </div>
            </div>
          </div>

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

                    {tags.diets.map((tag, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 bg-customGreen text-white text-sm font-semibold rounded-full"
                    >
                        {tag}
                    </span>
                    ))}
                    
                </div>
            </div>

          {/* Reviews List */}
          <div className="mt-[50px]">
            <h3 className="font-[700] font-serif text-[25px] my-2">Reviews</h3>
            <div className="border-b-1 border-customDarkGreen" />

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
            <div className="border-b-1 border-customDarkGreen border-opacity-50"/>
            <h3 className="font-[700] font-serif text-[25px] my-2 mb-4">Comments</h3>
              
              {reviews.map((review) => (
                <div key={review._id} className="review">
                  <p><strong>{review.username || "Anonymous"}</strong></p>
                  <p>Rating: {review.rating}</p>
                  <p>{review.comment}</p>
                </div>
              ))}
          </div>
           
        </div>
      </div>
    )
}