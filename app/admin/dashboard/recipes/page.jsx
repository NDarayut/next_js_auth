"use client";
import { useState, useEffect } from "react";
import RecipesBoard from "./components/RecipesBoard";
import SideBar from "../components/SideBar";
import { useRouter } from "next/navigation";

export default function RecipesDashboard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // Track the current page
  const router = useRouter();

  // Function to fetch all recipes from the database and display them
  const fetchRecipes = async (page) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/recipes/getAllRecipes?page=${page}&limit=20`);
      const data = await response.json();

      if (response.ok) {
        if (page === 1) {
          // For the first page, replace the entire list with 20 recipes
          setRecipes(data);
        } 
        
        else {
          // For subsequent pages, append the data fetch subsequently
          setRecipes((prevRecipes) => [...prevRecipes, ...data]);
        }
      } 
      
      else {
        setError(data.error || "Failed to fetch recipes.");
      }
    } 
    
    catch (error) {
      console.error(error);
      setError("An error occurred while fetching recipes.");
    } 
    
    finally {
      setLoading(false);
    }
  };


  // If user delete a recipe, call API to delete it immediately
  const handleDelete = async (recipeId) => {
    try {
      const response = await fetch(`/api/recipes/delete/${recipeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete recipe");
      }

      // Remove the deleted recipe from the UI without reloading the page
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    } 
    
    catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  // Redirect to a new page that handles recipe update
  const handleEdit = (recipeId) => {
    router.push(`/admin/dashboard/recipes/update/${recipeId}`); // Redirect to the update page
  };

  // Fetch recipes when the page loads
  useEffect(() => {
    fetchRecipes(page);
  }, [page]);

  // Load more recipes when the button is clicked
  const loadMoreRecipes = () => {
    setPage((prevPage) => prevPage + 1); // Increase the page number to load the next set of recipes
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 p-8">

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Recipes Board */}
        <RecipesBoard
          recipes={recipes}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          loading={loading}
        />

        {/* Load More Button */}
        {recipes.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={loadMoreRecipes}
              disabled={loading}
              className="generalButton text-white"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
