"use client";
import { useSearchParams } from "next/navigation"; // Hook to read query parameters from the URL
import { useRecipes } from "@/app/hook/useRecipes"; // Custom hook to fetch recipes
import { useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";

export default function SearchResults() {
  const searchParams = useSearchParams(); // Read query parameters from the URL
  const query = searchParams.get("query"); // Extract value from the query parameter

  // Filter parameters
  const dishTypes = searchParams.get("dishTypes");
  const cuisines = searchParams.get("cuisines");
  const occasions = searchParams.get("occasions");
  const diets = searchParams.get("diets");

  const { recipes, loading, error, searchRecipes } = useRecipes();

  useEffect(() => {
    if (query) {
      searchRecipes(query, { dishTypes, cuisines, occasions, diets }); // Fetch recipes based on query and filters
    }
  }, [query, dishTypes, cuisines, occasions, diets]);

  if (!query) {
    return <p>Please enter a search term.</p>; // Handle empty query case
  }

  return (
    <div className="p-4">
      <Navbar />
      <SearchBar/>
      <h1 className="text-xl font-bold mb-4">Search Results for "{query}"</h1>
      
      {/* Filter Controls */}
      <div className="mb-4">
        <select
          onChange={(e) => searchRecipes(query, { dishTypes: e.target.value })}
          value={dishTypes || ''}
        >
          <option value="">Select Dish Type</option>
          <option value="dessert">Dessert</option>
          <option value="main course">Main Course</option>
        </select>
        <select
          onChange={(e) => searchRecipes(query, { cuisines: e.target.value })}
          value={cuisines || ''}
        >
          <option value="">Select Cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
        </select>
        <select
          onChange={(e) => searchRecipes(query, { occasions: e.target.value })}
          value={occasions || ''}
        >
          <option value="">Select Occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Holiday">Holiday</option>
        </select>
        <select
          onChange={(e) => searchRecipes(query, { diets: e.target.value })}
          value={diets || ''}
        >
          <option value="">Select Diet</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 p-4 mb-11">
        {/* Check if there is a recipe in the recipes array */}
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id || recipe._id}
              recipeId={recipe.id || recipe._id}
              src={recipe.image}
              title={recipe.title}
              isFavorited={false}
            />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}
