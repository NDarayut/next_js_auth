import { useState, useEffect } from "react";
import RecipeCard from "../../../../components/RecipeCard";
import { useSession } from "next-auth/react";


export default function UserCreatedRecipes ({ userId }) {
  const [recipeIds, setRecipeIds] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);
  const {data: session} = useSession();
  
  
  useEffect(() => {
    if (!userId) return;

    // Fetches only the ID of user-created recipes
    const fetchUserRecipeIds = async () => {
      try {
        const response = await fetch(`/api/userRecipe/get/${userId}`);
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

    fetchUserRecipeIds();
  }, [userId]);

  useEffect(() => {

    // Fetches the recipe detail based on the ID
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

    // Fetches user's favorited recipe
    // A user created recipe does not meant a user favorite recipe. So user can choose to favorite
    // their created recipe like any other recipe
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

    fetchRecipeDetails();
    fetchUserFavorites()
  }, [recipeIds]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!recipes.length) {
    return <div>No user created recipes found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
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
      ))}
    </div>
  );
};
