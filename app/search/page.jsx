"use client";
import { useSearchParams } from "next/navigation"; // Hook that allow you to read query parameter from the URL
import { useRecipes } from "@/app/hook/useRecipes"; // Custom hook to fetch recipe
import { useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";

export default function SearchResults() {

  const searchParams = useSearchParams(); // Reads the cuurent query parameter from the URL
  const query = searchParams.get("query"); // Extract value from query parameter

  // Destructuring the returned value from the useRecipe hook
  const { recipes, loading, error, searchRecipes } = useRecipes();

  // useEffect trigger the searchRecipes function whenever the query is changes
  useEffect(() => {
    if (query) {
      searchRecipes(query); // Fetch recipes on page load if query exists
    }
  }, [query]);

  if (!query) {
    return <p>Please enter a search term.</p>; // Handle empty query case
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search Results for "{query}"</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 p-4 mb-11">

        {/*Check if there is a recipe in the recipes arrays */}
        {recipes.length > 0 ? (
          // Loop through each item in the recipe array and build each card for each recipe
          recipes.map((recipe) => (
            <RecipeCard
              recipeId={recipe.id}
              src={recipe.image} // Pass image URL dynamically
              title={recipe.title} // Pass title dynamically
              isFavorited={false}
            />
          ))
        ) : (
          <p>No recipes found.</p> // Handle no results case
        )}
      </div>
    </div>
  );
}
