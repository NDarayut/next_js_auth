import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user"; // Replace with your actual user model
import Recipe from "@/models/recipe"; // Replace with your actual recipe model
import Review from "@/models/review"; // Replace with your actual review model

/*
    This API is used to fetch the amount of user, recipe, and comment exist on the website
*/
export async function GET(req) {
    try {
        req.url
        // Connect to MongoDB
        await connectMongoDB();

        // Fetch stats
        const usersCount = await User.countDocuments();
        const recipesCount = await Recipe.countDocuments();
        const reviewsCount = await Review.countDocuments();

        return new Response(
            JSON.stringify({ usersCount, recipesCount, reviewsCount }),
            { status: 200 }
        );
    } 
    
    catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch stats" }),
            { status: 500 }
        );
    }
}
