"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";
import Navbar from "@/components/Navbar";
import Filter from "@/components/Filter";
import { useSession } from "next-auth/react";
import Footer from "@/components/Footer";

export default function SearchResults() {
  const searchParams = useSearchParams(); // Access URL query parameters
  const { data: session } = useSession();

  const [recipes, setRecipes] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [dishTypes, setDishTypes] = useState([]);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // Full-page loading state
  const [isFiltering, setIsFiltering] = useState(false); // Filtering state

  // Extract the query params directly from the searchParams object
  const query = searchParams.get("query");
  const selectedDishType = searchParams.get("dishTypes");
  const selectedCuisine = searchParams.get("cuisines");

  // Fetch cuisines and dish types
  const fetchCuisinesAndDishTypes = async () => {
    try {
      // Fetching an array of cuisines and dishtypes to use as filter option
      const cuisinesResponse = await fetch("/api/categories/cuisines");
      const dishTypesResponse = await fetch("/api/categories/dishtypes");

      const cuisinesData = await cuisinesResponse.json();
      const dishTypesData = await dishTypesResponse.json();

      // Setting the array
      setCuisines(cuisinesData);
      setDishTypes(dishTypesData);
    } 
    
    catch (error) {
      console.error("Error fetching cuisines and dish types:", error);
    }
  };

  // Fetch recipes based on filters
  const fetchRecipes = async (isInitialLoad = false) => {
    if (isInitialLoad) setLoading(true);
    else setIsFiltering(true);

    const queryParams = {};
    if (query) queryParams.query = query;
    if (selectedCuisine) queryParams.cuisines = selectedCuisine;
    if (selectedDishType) queryParams.dishTypes = selectedDishType;

    const queryString = new URLSearchParams(queryParams).toString();

    try {
      const response = await fetch(`/api/recipes/search?${queryString}`);
      const data = await response.json();
      setRecipes(data);
    } 
    
    catch (error) {
      console.error("Error fetching recipes:", error);
    } 
    
    finally {
      if (isInitialLoad) setLoading(false);
      else setIsFiltering(false);
    }
  };

  const fetchUserFavorites = async () => {
    if (session?.user?.id) {
      try {
        const response = await fetch(`/api/favorite/get/${session?.user?.id}`);
        const data = await response.json();
        setFavoritedRecipes(data); // This should be an array of recipe IDs
      } catch (error) {
        console.log("Failed to fetch favorites: ", error);
      }
    }
  };

  // Fetch all the neccessary information upon page load and show loading scree
  useEffect(() => {
    fetchCuisinesAndDishTypes();
    fetchUserFavorites();
    fetchRecipes(true); // Fetch recipes for the initial page load which triggers a loading screen
  }, []);

  // Do not reset the filter and show loading screen when filtering for specific recipe
  useEffect(() => {
    fetchRecipes(false); // Fetch recipes when search params change (when filtering)
    fetchUserFavorites();
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-customYellow min-h-screen">
      <div className="mb-36">
        <Navbar />
      </div>

      <main className="mx-[100px]">
        <h1 className="mb-20 font-semibold text-2xl text-customDarkGreen">Result for {query}</h1>
        <div className="mb-20">
          <Filter cuisines={cuisines} dishTypes={dishTypes} query={query} />
        </div>

        {/* Show filtering spinner without resetting options */}
        {isFiltering && (
          <div className="text-center p-4">
            <p>Updating recipes...</p>
          </div>
        )}

        {/* Recipes display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 p-4 mb-11">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
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
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
