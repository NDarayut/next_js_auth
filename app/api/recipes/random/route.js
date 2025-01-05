import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe"; // Adjust the path based on your file structure

export async function GET(req) {
    try {
        req.url
        // Connect to MongoDB
        await connectMongoDB();

        // Fetch 20 random recipes from MongoDB
        const randomRecipes = await Recipe.aggregate([
            { $match: { status: "approved" } },
            { $sample: { size: 20 } } // Randomly select 20 documents
        ]);

        // Return the recipes as a JSON response
        return new Response(JSON.stringify(randomRecipes), { status: 200 });
    } 
    catch (error) {
        console.error("Error fetching random recipes:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), { status: 500 });
    }
}
