"use client";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import CustomCarousel from "@/components/CustomCarousel";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import SearchBarMain from "@/components/SearchBarMain";
import CustomRoundCarousel from "@/components/CustomRoundCarousel";
import { motion} from "framer-motion";
import { useInView } from "react-intersection-observer"; // Ensure you're using this hook
import LatestCard from "@/components/LatestCard";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [latestRecipes, setLatestRecipe] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const { data: session } = useSession();
  const [popularPage, setPopularPage] = useState(1); // Separate page for Popular Recipes
  const [latestPage, setLatestPage] = useState(1); // Separate page for Latest Recipes
  const [loading, setLoading] = useState(true); // State to track loading

  // Use to determine if the motion.div element is 10% within view.
  // If 10% of the herosection is in view, it will trigger an animation
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

  // Fetch recipes based on the current page
  const fetchRecipes = async (page) => {
    try {
      const response = await fetch(`/api/recipes/popular?page=${page}&limit=16`);
      const data = await response.json();
      
      // On the first page, simply set the recipes
      if (page === 1) {
        setRecipes(data);
      } 
      else {
        // On subsequent pages, append the new recipes
        setRecipes((prevRecipes) => [...prevRecipes, ...data]);
      }
    } 
    catch (error) {
      console.log("Failed to fetch recipes:", error);
    }
  };

  // Fetch the latest recipe
  const fetchLatestRecipe = async (page) => {
    try {
      const response = await fetch(`/api/recipes/latestRecipes?page=${page}&limit=6`);
      const data = await response.json();

      if(page === 1){
        setLatestRecipe(data);
      }
      else{
        setLatestRecipe((prevRecipes) => [...prevRecipes, ...data])
      }
      
      console.log(latestRecipes)
    } 
    
    catch (error) {
      console.error("Failed to fetch the latest recipe:", error);
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


  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchRecipes(popularPage),
        fetchLatestRecipe(latestPage),
        fetchUserFavorites(),
      ]);
      setLoading(false); // Set loading to false after all data is fetched
    };
    fetchData();
  }, [popularPage, latestPage, session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLoadMorePopular = () => {
    setPopularPage((prevPage) => prevPage + 1); // Increment popular page
  };

  const handleLoadMoreLatest = () => {
    setLatestPage((prevPage) => prevPage + 1); // Increment latest page
  };

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
            ref={heroRef} // Use to reference if the object is within view
            initial={{ opacity: 0, y: 50 }} // Transparent and 50 pixel lower on y-axis
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }} // If the component is in view it will go visible
            transition={{ duration: 0.6 }} // The transition last for 0.6 seconds
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
        <div>
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
                averageRating={recipe.averageRating}
                readyInMinutes={recipe.readyInMinutes}
              />
            ))}
          </article>
          <div className="w-full flex justify-center">
            <button onClick={handleLoadMorePopular} className="generalButton text-white">
                Load More
            </button>
          </div>
          
        </div>
        
      </motion.div>

      <motion.div
        ref={randomRecipeRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: randomRecipeInView ? 1 : 0, y: randomRecipeInView ? 0 : 50 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="font-serif text-[40px] text-customDarkGreen">Lastest Recipes</h1>
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-10 p-4 mb-11">
          {latestRecipes.map((latestRecipe) => (
                <LatestCard
                  key={latestRecipe._id}
                  recipeId={latestRecipe._id}
                  src={latestRecipe.image}
                  title={latestRecipe.title}
                  isFavorited={favoritedRecipes.includes(latestRecipe._id)}
                  createdAt={latestRecipe.createdAt}
                />
          ))}
          </article>
          <div className="w-full flex justify-center">
              <button onClick={handleLoadMoreLatest} className="generalButton text-white">
                  Load More
              </button>
          </div>
        </div>
      </motion.div>
      </div>
      <div className="mt-28">
        <Footer />
      </div>
      
    </>
  );
}
