"use client";
import { useState, useEffect } from "react";
import { Button, Spinner, Link } from "@nextui-org/react";
import RecipesBoard from "./components/RecipesBoard";
import SideBar from "../components/SideBar";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // Track the current page
  const router = useRouter();

  // Function to fetch recipes
  const fetchRecipes = async (page) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/recipes/getAllRecipes?page=${page}&limit=20`);
      const data = await response.json();

      if (response.ok) {
        setRecipes((prevRecipes) => [...prevRecipes, ...data]); // Append new recipes to the list
      } else {
        setError(data.error || "Failed to fetch recipes.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching recipes.");
    } finally {
      setLoading(false);
    }
  };

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
        <RecipesBoard
            key={recipes.length} // Ensures re-render on state change
            error={error}
            recipes={recipes}
            loading={loading}
            loadMoreRecipes={loadMoreRecipes}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
        />
      </main>
    </div>
  );
}
