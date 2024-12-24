import { connectMongoDB } from "@/lib/mongodb";
import Favorite from "@/models/favorite";

export async function GET(req, { params }) {
    try {
        const { userId } = params; // Extract userId from the route parameters

        if (!userId) {
            return new Response(JSON.stringify({ error: "User ID not found in URL" }), {
                status: 400,
            });
        }

        console.log("Extracted User ID from URL:", userId);

        // Connect to the database
        await connectMongoDB();

        // Fetch the user's favorite recipe IDs from the database
        const favorites = await Favorite.find({ user: userId });

        if (!favorites || favorites.length === 0) {
            return new Response(
                JSON.stringify({ message: "No favorite recipes found" }),
                { status: 404 }
            );
        }

        // Extract recipeIds
        const recipeIds = favorites.map((favorite) => favorite.recipeId);

        // Return recipe IDs to the frontend
        return new Response(JSON.stringify(recipeIds), {
            status: 200,
        });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
}
