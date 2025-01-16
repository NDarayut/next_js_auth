import { useState } from "react";

export const useRecipes = () => {

    const [recipeDetail, setRecipeDetail] = useState(null); // store detail of one recipes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch the recipe details based on the recipe ID
    const fetchRecipeById = async (id) => {
        setLoading(true);
        setError(null);

        try {
            // Using the API we've just created in recipes folder
            const response = await fetch(`/api/recipes/${id}`);
            const data = await response.json();

            // Extracting important nutrients
            const importantNutrients = data.nutrition?.nutrients?.filter(nutrient =>
                ["Calories", "Fat", "Saturated Fat", "Cholesterol", "Sodium",  "Potassium", "Carbohydrates", "Sugar", "Protein",].includes(nutrient.name)
            );

            setRecipeDetail({
                ...data,
                nutrition: importantNutrients,
            });
 
        } 

        catch (err) {
            setError("Failed to fetch recipe details.");
        } 

        finally {
            setLoading(false);
        }
    };

    return {
        recipeDetail,
        loading,
        error,
        fetchRecipeById,
    };
};
