import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

export async function GET() {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Fetch 5 random recipes
        const randomRecipes = await Recipe.aggregate([
            { $match: { status: "approved" } }, // Fetch only approved recipes
            { $sample: { size: 5 } }, // Get 5 random recipes
            {
                $project: {
                    _id: 1, // Exclude the MongoDB ID from the result
                    title: 1,
                    cuisine: 1,
                    summary: 1,
                    image: 1,
                    readyInMinutes: 1,
                    createdAt: 1, // Include the createdAt field
                    sourceName: 1,
                },
            },
        ]);

        // Extract first sentence from summary and format cuisine
        const formattedRecipes = randomRecipes.map(recipe => {
            const firstSentence = recipe.summary.split('.')[0] + '.'; // Get the first sentence
            return {
                ...recipe,
                summary: firstSentence, // Set the first sentence as summary
                cuisine: recipe.cuisine && recipe.cuisine.length > 0 ? recipe.cuisine[0] : "World food",
            };
        });

        // Return the recipes as a JSON response
        return new Response(JSON.stringify(formattedRecipes), { status: 200 });
    } catch (error) {
        console.error("Error fetching random recipes:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), { status: 500 });
    }
}