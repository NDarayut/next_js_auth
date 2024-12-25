"use client";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import CustomCarousel from "@/components/CustomCarousel";
import RandomCard from "@/components/RandomCard";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import SearchBar from "@/components/SearchBar";
import SearchBarMain from "@/components/SearchBarMain";
import CustomRoundCarousel from "@/components/CustomRoundCarousel";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes/random");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.log("Failed to fetch recipes in homepage: ", error);
      }
    };

    const fetchUserFavorites = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/favorite/get/${session.user.id}`);
          const data = await response.json();
          setFavoritedRecipes(data); // This should be an array of recipe IDs
        } catch (error) {
          console.log("Failed to fetch favorites: ", error);
        }
      }
    };

    fetchRecipes();
    fetchUserFavorites();
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="sticky top-0 bg-customYellow z-50">
        <Navbar />
      </div>


      {/* Hero Section with Parallax */}
      <div className="relative h-[500px] bg-fixed bg-center bg-cover mb-20" style={{ backgroundImage: "url('/about_img.jpg')" }}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col gap-8">
              <h1 className="text-white text-6xl font-bold text-center px-4 font-serif">
                  Delicious Recipes
              </h1>
              <SearchBarMain/>
          </div>
      </div>



      <main className="px-[60px]">
        <div className="mb-28">
          <CustomCarousel />
        </div>

        <div className="mb-28">
          <h1 className="font-serif text-[40px] text-customDarkGreen">Cuisines</h1>
          <CustomRoundCarousel />
        </div>

        <h1 className="font-serif text-[40px] text-customDarkGreen">Popular Dishes</h1>
        <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 p-4 mb-11">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipeId={recipe._id}
              src={recipe.image} // Pass image URL dynamically
              title={recipe.title} // Pass title dynamically
              isFavorited={favoritedRecipes.includes(recipe._id)} // Check if the recipe is in the favorited list
              sourceName={recipe.sourceName}
              rating={recipe.score}
              readyInMinutes={recipe.readyInMinutes}
            />
          ))}
        </article>

        <h1 className="font-serif text-[40px]">Random recipe</h1>
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-10 p-4 mb-11">
          <RandomCard />
          <RandomCard />
          <RandomCard />
          <RandomCard />
        </article>
      </main>
      <Footer />
    </>
  );
}
