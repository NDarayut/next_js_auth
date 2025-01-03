import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe"; // Adjust the path based on your file structure

export async function GET() {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Fetch the top 20 popular recipes based on the score
        const popularRecipes = await Recipe.aggregate([
            { $match: { status: "approved" } }, // Filter for approved recipes
            { $sort: { score: -1 } },           // Sort by score in descending order (highest first)
            { $limit: 20 }                      // Limit to the top 20 recipes
        ]);

        // Return the recipes as a JSON response
        return new Response(JSON.stringify(popularRecipes), { status: 200 });
    } 
    catch (error) {
        console.error("Error fetching popular recipes:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), { status: 500 });
    }
}
