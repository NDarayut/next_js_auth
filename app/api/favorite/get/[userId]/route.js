import { connectMongoDB } from "@/lib/mongodb";
import Favorite from "@/models/favorite";

/*
    This API fetch all the favorited recipe of a user based on the user's ID
*/
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

        // Fetch the user's favorite recipe IDs from the database
        const favorites = await Favorite.find({ user: userId });

        // Return an empty array if no favorites found, else return the recipe IDs
        const recipeIds = favorites.length > 0 ? favorites.map((favorite) => favorite.recipeId) : [];

        // Return recipe IDs to the frontend
        return new Response(JSON.stringify(recipeIds), {
            status: 200,
        });
    } 
    
    catch (error) {
        console.error("Error fetching favorites:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500 }
        );
    }
}
