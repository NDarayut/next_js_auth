"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";
import Navbar from "@/components/Navbar";

export default function SearchResults() {
  const searchParams = useSearchParams(); // Access URL query parameters
  const router = useRouter(); // Use router for navigation and updating query parameters

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract the initial search query and filters from the URL
  const query = searchParams.get("query");
  const dishTypes = searchParams.get("dishTypes");
  const cuisines = searchParams.get("cuisines");
  const occasions = searchParams.get("occasions");
  const diets = searchParams.get("diets");

  // Function to fetch recipes based on current query and filters
  const fetchRecipes = async (filters = {}) => {
    setLoading(true);
    setError(null);
  
    try {
      // Build the filter parameters dynamically and omit empty filters
      const filterParams = new URLSearchParams();
      if (dishTypes) filterParams.set("dishTypes", dishTypes);
      if (cuisines) filterParams.set("cuisines", cuisines);
      if (occasions) filterParams.set("occasions", occasions);
      if (diets) filterParams.set("diets", diets);
  
      // Construct API URL without encoding query
      const apiUrl = `/api/recipes/search?query=${query}&${filterParams.toString()}`;
  
      console.log('API URL:', apiUrl); // Debugging line
  
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch recipes");
  
      const data = await response.json();
      setRecipes(data); // Update recipes state
    } catch (err) {
      console.error("Error Fetching Recipes:", err);
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch recipes initially and whenever filters change
  useEffect(() => {
    const filters = { dishTypes, cuisines, occasions, diets }; // Collect filters from URL
    fetchRecipes(filters);
  }, [query, dishTypes, cuisines, occasions, diets]);

  // Handle filter changes and update the URL
  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set(key, value); // Add or update filter
    } else {
      newParams.delete(key); // Remove filter if value is empty
    }
    router.push(`/search?${newParams.toString()}`); // Update URL
  };

  return (
    <div className="bg-customYellow min-h-screen">
      <div className="mb-20">
        <Navbar />
      </div>
      
      <h1 className="text-xl font-bold mb-4">Search Results for &quot;{query}&quot;</h1>

      {/* Filter Controls */}
      <div className="mb-4">
        <select
          onChange={(e) => handleFilterChange("dishTypes", e.target.value)}
          value={dishTypes || ""}
        >
          <option value="">Select Dish Type</option>
          <option value="dessert">Dessert</option>
          <option value="main course">Main Course</option>
        </select>
        <select
          onChange={(e) => handleFilterChange("cuisines", e.target.value)}
          value={cuisines || ""}
        >
          <option value="">Select Cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
        </select>
        <select
          onChange={(e) => handleFilterChange("occasions", e.target.value)}
          value={occasions || ""}
        >
          <option value="">Select Occasion</option>
          <option value="Birthday">Birthday</option>
          <option value="Holiday">Holiday</option>
        </select>
        <select
          onChange={(e) => handleFilterChange("diets", e.target.value)}
          value={diets || ""}
        >
          <option value="">Select Diet</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Recipes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 p-4 mb-11">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipeId={recipe._id}
              src={recipe.image}
              title={recipe.title}
              isFavorited={false}
              sourceName={recipe.sourceName}
              rating={recipe.score}
              readyInMinutes={recipe.readyInMinutes}
            />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}
