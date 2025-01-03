"use client";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import CustomCarousel from "@/components/CustomCarousel";
import RandomCard from "@/components/RandomCard";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import SearchBarMain from "@/components/SearchBarMain";
import CustomRoundCarousel from "@/components/CustomRoundCarousel";
import { motion} from "framer-motion";
import { useInView } from "react-intersection-observer"; // Ensure you're using this hook

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const { data: session, status } = useSession();

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: carouselRef, inView: carouselInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: popularDishesRef, inView: popularDishesInView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const { ref: randomRecipeRef, inView: randomRecipeInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes/popular");
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
      
      <div
        className="relative h-[500px] bg-fixed bg-center bg-cover mb-20"
        style={{ backgroundImage: "url('/about_img.jpg')" }}
      >
        {/* Non-animated layout wrapper */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col gap-8">
          {/* Motion content */}
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-white text-6xl font-bold px-4 font-serif">
              Delicious Recipes
            </h1>
            <SearchBarMain />
          </motion.div>
        </div>
      </div>

      <div className="mx-[100px]">
        <main className="px-[60px]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-28">
            <CustomCarousel />
          </div>
        </motion.div>

        <motion.div
          ref={carouselRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: carouselInView ? 1 : 0, y: carouselInView ? 0 : 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-20">
            <h1 className="font-serif text-[40px] text-customDarkGreen">Cuisines</h1>
            <CustomRoundCarousel />
          </div>
        </motion.div>
        </main>
      

      <motion.div
        ref={popularDishesRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: popularDishesInView ? 1 : 0, y: popularDishesInView ? 0 : 50 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-[40px] text-customDarkGreen">Popular Dishes</h1>
        <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 p-4 mb-11">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipeId={recipe._id}
              src={recipe.image}
              title={recipe.title}
              isFavorited={favoritedRecipes.includes(recipe._id)}
              sourceName={recipe.sourceName}
              rating={recipe.score}
              readyInMinutes={recipe.readyInMinutes}
            />
          ))}
        </article>
      </motion.div>

      <motion.div
        ref={randomRecipeRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: randomRecipeInView ? 1 : 0, y: randomRecipeInView ? 0 : 50 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-[40px]">Random recipe</h1>
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-10 p-4 mb-11">
          <RandomCard />
          <RandomCard />
          <RandomCard />
          <RandomCard />
        </article>
      
      </motion.div>
      </div>

      <Footer />
    </>
  );
}
