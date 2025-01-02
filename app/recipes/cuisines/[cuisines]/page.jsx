"use client";
import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";

const CuisinePage = ({ params }) => {
  const { cuisine } = params; // Get the cuisine from the URL
  const [recipes, setRecipes] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch recipes based on cuisine
    const c = "asian"; // You may want to replace this with dynamic cuisine
    fetch(`/api/recipes/cuisines/${c}`)
      .then((response) => response.json())
      .then((data) => {
        // Ensure data.recipes is an array, if not set it to an empty array
        setRecipes(data.recipes || []);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setRecipes([]); // In case of an error, ensure recipes is empty
      });
  }, [cuisine]); // Only depend on 'cuisine' for re-fetching

  return (
    <div>
      <h1>Recipes for {cuisine}</h1>

      {recipes.length > 0 ? (
        recipes.map((recipe) => (
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
        ))
      ) : (
        <p>No recipes found for {cuisine}</p> // Handle case when no recipes are found
      )}
    </div>
  );
};

export default CuisinePage;
