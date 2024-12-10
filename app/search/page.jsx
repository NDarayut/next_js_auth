"use client";
import { useSearchParams } from "next/navigation";
import { useRecipes } from "@/app/hook/useRecipes";
import { useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";

export default function SearchResults() {

  const searchParams = useSearchParams();
  const query = searchParams.get("query"); // Extract query parameter
  const { recipes, loading, error, searchRecipes } = useRecipes();

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
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              src={recipe.image} // Pass image URL dynamically
              title={recipe.title} // Pass title dynamically
            />
          ))
        ) : (
          <p>No recipes found.</p> // Handle no results case
        )}
      </div>
    </div>
  );
}
