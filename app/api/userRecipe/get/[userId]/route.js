import { connectMongoDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import Recipe from "@/models/recipe";

export async function GET(req, { params }) {
    try {
        const { userId } = params; // Extract userId from the route parameters

        if (!userId) {
            return new Response(JSON.stringify({ error: "User ID not found in URL" }), {
                status: 400,
            });
        }

        // Connect to the database
        await connectMongoDB();

        // Fetch only recipe Id, because image is too large to fetch
        const userRecipes = await Recipe.find({ userId: userId }, {_id:1});

        // Return an empty array if no created recipe found, else return the recipe IDs
        const recipeIds = userRecipes.length > 0 ? userRecipes.map((userRecipe) => userRecipe._id) : [];

        // Return recipe IDs to the frontend
        return new Response(JSON.stringify(recipeIds), {
            status: 200,
        });
    } 
    
    catch (error) {
        console.error("Error fetching created recipes:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
}
