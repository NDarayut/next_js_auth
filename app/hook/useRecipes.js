import { useState } from "react";

export const useRecipes = () => {

    const [recipes, setRecipes] = useState([]); // retrieved a list of recipes based on search
    const [recipeDetail, setRecipeDetail] = useState(null); // store detail of one recipes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Search for recipes based on our search query
    const searchRecipes = async (query) => {
        setLoading(true);
        setError(null);

        try {
            // using the search API we've just created to query recipe
            const response = await fetch(`/api/recipes/search?query=${query}`);
            const data = await response.json(); // convert it to json
            console.log(data) // debug
            setRecipes(data);
        } 

        catch (err) {
            setError("Failed to fetch recipes.");
        } 

        finally {
            setLoading(false);
        }
    };

    // Fetch the recipe details based on the recipe ID
    const fetchRecipeById = async (id) => {
        setLoading(true);
        setError(null);

        try {
            // Using the API we've just created in recipes folder
            const response = await fetch(`/api/recipes/${id}`);
            const data = await response.json();
            setRecipeDetail(data);
        } 

        catch (err) {
            setError("Failed to fetch recipe details.");
        } 

        finally {
            setLoading(false);
        }
    };

    return {
        recipes,
        recipeDetail,
        loading,
        error,
        searchRecipes,
        fetchRecipeById,
    };
};
