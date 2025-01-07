"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";
import Navbar from "@/components/Navbar";
import Filter from "@/components/Filter";
import { useSession } from "next-auth/react";

export default function SearchResults() {
  const searchParams = useSearchParams(); // Access URL query parameters
  const { data: session, status } = useSession();
  const [recipes, setRecipes] = useState([]);
  const [cuisines, setCuisines] = useState([]); // Example cuisines
  const [dishTypes, setDishTypes] = useState([]); // Example dish types
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  // Extract the query params directly from the searchParams object
  const query = searchParams.get("query");
  const selectedDishType = searchParams.get("dishTypes");
  const selectedCuisine = searchParams.get("cuisines");

  // Fetch cuisines and dish types from your APIs
  const fetchCuisinesAndDishTypes = async () => {
    try {
      const cuisinesResponse = await fetch("/api/categories/cuisines");
      const dishTypesResponse = await fetch("/api/categories/dishtypes");

      const cuisinesData = await cuisinesResponse.json();
      const dishTypesData = await dishTypesResponse.json();

      setCuisines(cuisinesData); // Set fetched cuisines
      setDishTypes(dishTypesData); // Set fetched dish types
    } catch (error) {
      console.error("Error fetching cuisines and dish types:", error);
    }
  };

  // Fetch recipes based on the filters
  const fetchRecipes = async () => {
    setLoading(true);
    const queryParams = {};

    // Add filters to the queryParams object if they exist
    if (query) queryParams.query = query;
    if (selectedCuisine) queryParams.cuisines = selectedCuisine;
    if (selectedDishType) queryParams.dishTypes = selectedDishType;
    

    const queryString = new URLSearchParams(queryParams).toString();
    console.log(queryString)
    try {
      const response = await fetch(`/api/recipes/search?${queryString}`);
      const data = await response.json();
      setRecipes(data); // Set the filtered recipes
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false); // Set loading to false once the data is fetched
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
    fetchUserFavorites();
    fetchCuisinesAndDishTypes(); // Fetch cuisines and dish types
    fetchRecipes(); // Fetch recipes when the component mounts or search params change
  }, [searchParams]); // Re-fetch when search params change

  return (
    <div className="bg-customYellow min-h-screen">
      <div className="mb-20">
        <Navbar />
      </div>
      <Filter cuisines={cuisines} dishTypes={dishTypes} query={query}/>

      {/* Display loading message or spinner */}
      {loading ? (
        <div className="text-center p-4">
          <p>Loading recipes...</p>
          {/* Optionally, you can add a spinner here */}
        </div>
      ) : (
        // Display Recipes once data is loaded
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
      )}
    </div>
  );
}
