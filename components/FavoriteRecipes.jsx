import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";


export default function FavoriteRecipes ({ userId }) {
  const [recipeIds, setRecipeIds] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    if (!userId) return;

    const fetchFavoriteRecipeIds = async () => {
      try {
        const response = await fetch(`/api/favorite/get/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setRecipeIds(data);
        } else {
          setError(data.error || "Failed to load favorite recipe IDs");
        }
      } catch (error) {
        setError("An error occurred while fetching the favorite recipe IDs");
      }
    };

    fetchFavoriteRecipeIds();
  }, [userId]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (recipeIds.length > 0) {
        try {
          const recipeDetails = await Promise.all(
            recipeIds.map(async (id) => {
              const res = await fetch(`/api/recipes/${id}`);
              const data = await res.json();
              return data;
            })
          );
          setRecipes(recipeDetails);
        } catch (error) {
          setError("An error occurred while fetching recipe details");
        }
      }
    };

    fetchRecipeDetails();
  }, [recipeIds]);

  const handleRemove = (removedId) => {
    // Remove the unfavorited recipe from the state immediately
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== removedId));
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!recipes.length) {
    return <div>No favorite recipes found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipeId={recipe._id}
          src={recipe.image}
          title={recipe.title}
          isFavorited={true}
          sourceName={recipe.sourceName}
          rating={recipe.score}
          readyInMinutes={recipe.readyInMinutes}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
};
