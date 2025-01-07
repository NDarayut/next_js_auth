import mongoose from "mongoose"
import fetch from "node-fetch"; // Ensure you install this if using Node.js

import { connectMongoDB } from "../lib/mongodb.js"; 
import Recipe from "../models/recipe.js";


const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY; // Ensure your .env is set up
const BATCH_SIZE = 5; // Adjust batch size as needed
// Fetch recipes from Spoonacular API
const fetchRecipes = async () => {
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/random?number=${BATCH_SIZE}&includeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`
        );

        if (!response.ok) {
            console.error("Failed to fetch recipes:", response.statusText);
            return [];
        }

        const { recipes } = await response.json();
        return recipes;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
};

// Save fetched recipes to MongoDB
const saveRecipesToDatabase = async (recipes) => {
    try {
        const savePromises = recipes.map((recipe) => {

            const formattedRecipe = {
                title: recipe.title,
                status: "approved",
                score: 0,
                averageRating: 0,
                sourceName: recipe.sourceName || "Unknown",
                summary: recipe.summary,
                image: recipe.image,
                readyInMinutes: recipe.readyInMinutes,
                dishTypes: [],
                cuisines: [],
                nutrition: {
                    nutrients: recipe.nutrition?.nutrients?.length
                        ? recipe.nutrition.nutrients.map((n) => ({
                              name: n.name,
                              amount: n.amount.toString(), // Convert to string
                              unit: n.unit || " ", // Provide fallback value for unit
                          }))
                        : [], // Provide an empty array if no nutrients
                },
                extendedIngredients: recipe.extendedIngredients?.map((ingredient) => ({
                    amount: ingredient.amount,
                    unit: ingredient.unit || " ",
                    name: ingredient.name,
                })) || [],
                analyzedInstructions: recipe.analyzedInstructions?.map((instruction) => ({
                    steps: instruction.steps?.map((step) => ({
                        number: step.number,
                        step: step.step,
                    })) || [],
                })) || [],
            };

            return Recipe.create(formattedRecipe);
        });

        await Promise.all(savePromises);
        console.log(`${recipes.length} recipes saved to database.`);
    } catch (error) {
        console.error("Error saving recipes:", error);
    }
};

// Main script
const main = async () => {
    try {
        // Step 1: Connect to MongoDB
        await connectMongoDB();

        // Step 2: Fetch and Save Recipes
        const recipes = await fetchRecipes();
        if (recipes.length > 0) {
            await saveRecipesToDatabase(recipes);
        } else {
            console.log("No recipes fetched.");
        }

        // Step 3: Disconnect from MongoDB
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("Error in main function:", error);
    }
};

// Run the script
main();
