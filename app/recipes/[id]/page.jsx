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
import CommentSection from "./components/CommentSection"
import Footer from "@/components/Footer"

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

    if(loading){
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
        
        <div className="font-sans mx-[100px] mb-20">

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
          <CommentSection reviews={reviews} handleSubmit={handleSubmit} errors={errors} newRating={newRating} 
            setNewRating={setNewRating} newComment={newComment} setNewComment={setNewComment} />
          
        </div>
        <Footer />
      </div>
    )
}




