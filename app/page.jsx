"use client"
import Navbar from "@/components/Navbar";
import LoginBtn from "@/components/LoginBtn";
import RecipeCard from "@/components/RecipeCard";
import CustomCarousel from "@/components/CustomCarousel";
import SearchBar from "@/components/SearchBar";
import RandomCard from "@/components/RandomCard";
import LogoutBtn from "@/components/LogoutBtn";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";


export default function Home() {
  const [recipes, setRecipes] = useState([])
  const {data: session, status} = useSession()
  
  useEffect(() => {
    const fetchRecipes = async () =>{
      try{
        const response = await fetch("/api/recipes/random")
        const data = await response.json();
        setRecipes(data)
      }
      catch(error){
        console.log("Failed to fetch recipe in homepage: ", error)
      }
    };
    fetchRecipes();
  }, [])

  if (status === "loading") {
    // Optionally display a loading state while session is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
    
      <div className="sticky top-0 bg-customYellow z-50 px-[60px]">
        {status === "unauthenticated"? (
          <div className="mt-3 flex justify-end">
            <LoginBtn></LoginBtn>
          </div>
        ):(<p></p>)}
          
    
          <Navbar></Navbar>
      </div>

      <main className="px-[60px]">

        <div className="mb-11">
          <SearchBar></SearchBar>
        </div>
        

        <div className="mb-28">
          <CustomCarousel></CustomCarousel>
        </div>
        
        <h1 className="font-serif text-[40px] text-customDarkGreen">Popular Dishes</h1>
        <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 p-4 mb-11">

          {recipes.map((recipe) => (
            
            <RecipeCard
              recipeId={recipe.id}
              src={recipe.image} // Pass image URL dynamically
              title={recipe.title} // Pass title dynamically
              isFavorited={false}
              sourceName={recipe.sourceName}
              rating={recipe.spoonacularScore}
            />
          ))}
          
          
        </article>

        <h1 className="font-serif text-[40px]">Random recipe</h1>
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-10 p-4 mb-11">
          
          <RandomCard></RandomCard>
          <RandomCard></RandomCard>
          <RandomCard></RandomCard>
          <RandomCard></RandomCard>
          
        </article>

        

      </main>
      <Footer/>

    </>
    
  )
}
