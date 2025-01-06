"use client"
import { useRecipes } from "@/app/hook/useRecipes"
import Navbar from "@/components/Navbar"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import NutritionalFacts from "./components/NutritionalFacts"
import { motion } from "framer-motion";
import Introduction from "./components/Introduction"
import KeyInformation from "./components/KeyInformation"
import Ingredients from "./components/Ingredients"
import Instructions from "./components/Instructions"
import SimilarRecipe from "./components/SimilarRecipe"
import RecipeTags from "./components/RecipeTags"
import { useRouter } from "next/navigation";
import Image from "next/image"

export default function RecipeDetail({params}){

    const {id}  = params
    const {data: session, status} = useSession()
    const {recipeDetail, loading, error, fetchRecipeById} = useRecipes()
    const [similarRecipes, setSimilarRecipes] = useState([])

    const [reviews, setReviews] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [newRating, setNewRating] = useState(5);
    const [errors, setError] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const router = useRouter();
    
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
        fetchRecipeById(id) 
        fetchReviews();
        fetchSimilarRecipes()

      }, [id])

    useEffect(() => {
      if(status === "authenticated"){
        if (session?.user?.id === recipeDetail?.userId) {
          setIsOwner(true);
        }
        else if(session?.user?.role === "admin"){
          setIsOwner(true)
        }
      }
      
    }, [session, recipeDetail]);

    const handleSettingsClick = () => {
      router.push(`/recipes/update/${id}`); // Redirect to the update page
    };

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
        } 
        catch (errors) {
          console.error(errors);
          setError("Failed to submit review.");
        }
      }

    if(status === "loading"){
      return <p>Loading...</p>
    }

    if(error){
        return <p>Error: {error}</p>
    }

    if (!recipeDetail) {
        // Fallback in case recipeDetail is still null
        return <p>Loading...</p>
    }
    
    const introduction = {
      title: recipeDetail.title,
      author: recipeDetail.sourceName,
      description: recipeDetail.summary,
      recipeImage:  recipeDetail.image
    }

    const keyInformation = {
      prepTime: recipeDetail.readyInMinutes,
      calories: recipeDetail.nutrition?.find( (nutrient) => nutrient.name === "Calories")?.amount,
      numberOfIngredients: recipeDetail.extendedIngredients?.length
    }

    const ingredients = recipeDetail.extendedIngredients

    const instruction = recipeDetail.analyzedInstructions

    const tags = {
        dishTypes: recipeDetail.dishTypes || [],
        cuisines: recipeDetail.cuisines || [],
        occasions: recipeDetail.occasions || [],
        diets: recipeDetail.diets || [],
    }

    const similar = {
      loading: loading,
      error: error,
      similarRecipes: similarRecipes
    }

    

    return(
      <div className="bg-customYellow min-h-screen">

        <div className="sticky top-0 bg-customYellow z-50 mb-28">
          <Navbar />
        </div>
        
        <div className="font-sans mx-[100px]">

          {/*Title, author, description, image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}  // Start hidden and offset from the bottom
            animate={{ opacity: 1, y: 0 }}    // Animate to visible and no offset
            transition={{ duration: 0.8 }}    // Duration of animation
            className="relative"
          >
            
            <Introduction {...introduction} />

            {/*Settings icon */}
            {isOwner &&(
              <div className="absolute top-6 right-0">
                <button onClick={handleSettingsClick}>
                  <Image 
                    src="/setting.png"
                    alt="Settings"
                    width={32}
                    height={32}
                  />
                </button>
            </div>
            )}
             
          </motion.div>
          

          {/*Prep time, ingredients, calories */}
          <KeyInformation {...keyInformation}/>

          <div className="grid grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr] gap-8 mt-[50px]">

            {/* Left Column: Ingredients and Instructions */}
            <div className="border-r-1 border-customDarkGreen border-opacity-45 pr-11">

              {/* Ingredients Section */}
              <Ingredients ingredients={ingredients} />

              {/* Instructions Section */}
              <Instructions instruction={instruction} />

            </div>

            {/* Right Column: Similar Recipes */}
            <div>
              
              {/* Nutrition table */}
              <NutritionalFacts nutrition={recipeDetail?.nutrition} />

              {/*Similar Recipe */}
              <SimilarRecipe {...similar} />;

            </div>

          </div>

          {/*Recipe's tags*/}
          <RecipeTags tags={tags} />

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


