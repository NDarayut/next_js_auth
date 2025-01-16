import { getServerSession } from "next-auth";
import Favorite from "@/models/favorite";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";

/*
  This API will add the recipe's ID and the associated user's ID to the "favorite" model
*/
export async function POST(req) {
  try {
    // Get the session from NextAuth
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return new Response(JSON.stringify({ message: "User is not logged in" }), { status: 401 });
    }

    // Get the favorited recipe ID from the frontend
    const { recipeId } = await req.json();  

    if (!recipeId) {
      return new Response(JSON.stringify({ message: "Recipe ID is required." }), { status: 400 });
    }

    await connectMongoDB();

    // Check if the recipe has already been favorited
    const existingFavorite = await Favorite.findOne({ user: session.user.id, recipeId });

    if (existingFavorite) {
      return new Response(JSON.stringify({ message: "Recipe already favorited" }), { status: 400 });
    }

    // IF the recipe has not been favorited, we add it to the model
    const newFavorite = new Favorite({
      user: session.user.id,
      recipeId: recipeId,
    });

    await newFavorite.save();

    return new Response(JSON.stringify({ message: "Recipe favorited successfully" }), { status: 200 });
  } 

  catch (error) {
    console.error("Error adding favorite:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
