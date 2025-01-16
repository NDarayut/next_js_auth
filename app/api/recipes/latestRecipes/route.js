
import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

/*
    This API will fetch all recipe starting with the most recently created recipes
*/
export async function GET(request) {
    try {
        // Get page and limit from query parameters
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page")) || 1; // Default to page 1 if not provided
        const limit = parseInt(url.searchParams.get("limit")) || 6; // Default to 6 if not provided

        // Connect to MongoDB
        await connectMongoDB();

        // Fetch the latest recipes, sorted by createdAt (newest first)
        const latestRecipes = await Recipe.aggregate([
            { $match: { status: "approved" } }, // Adjust based on your recipe status if needed
            { $sort: { createdAt: -1, _id: 1} }, // Sort by createdAt to get the latest recipes
            { $skip: (page - 1) * limit }, // Skip based on the current page
            { $limit: limit }, // Limit to the specified number of recipes
        ]);

        // Return the recipes as a JSON response
        return new Response(JSON.stringify(latestRecipes), { status: 200 });
    }
    
    catch (error) {
        console.error("Error fetching latest recipes:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), { status: 500 });
    }
}
