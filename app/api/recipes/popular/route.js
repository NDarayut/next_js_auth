import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe"; // Adjust the path based on your file structure

export async function GET(request) {
    try {

        // Get page and limit from query parameters
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page")) || 1; // Default to page 1 if not provided
        const limit = parseInt(url.searchParams.get("limit")) || 16; // Default to 16 if not provided

        // Connect to MongoDB
        await connectMongoDB();

        // Fetch the top 20 popular recipes based on the score
        const popularRecipes = await Recipe.aggregate([
            { $match: { status: "approved" } },
            { $sort: { score: -1, _id:1 } },
            { $skip: (page - 1) * limit }, // Skip the appropriate number of recipes based on page
            { $limit: limit }, // Limit to the number of recipes specified by the limit
        ]);

        // Return the recipes as a JSON response
        return new Response(JSON.stringify(popularRecipes), { status: 200 });
    } 
    catch (error) {
        console.error("Error fetching popular recipes:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), { status: 500 });
    }
}
