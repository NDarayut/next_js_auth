import { connectMongoDB } from "@/lib/mongodb";
import Favorite from "@/models/favorite";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

/*
  This API remove recipe from the user's favorite list.
  This API will delete the recipe from the favorite model.
*/
export async function DELETE(req) {
  try {
    // Check if the user is authenticated
    const session = await getServerSession(authOptions);
    if (!session || !session.user.role) {
      return new Response(JSON.stringify({ message: "Please log in to favorite recipes" }), {
        status: 401,
      });
    }

    // Extract the recipeId from the request body
    const { recipeId } = await req.json();
    if (!recipeId) {
      return new Response(JSON.stringify({ message: "Recipe ID is required" }), {
        status: 400,
      });
    }

    // Connect to the database
    await connectMongoDB();

    // Find the favorite document by user ID and recipeId
    const favorite = await Favorite.findOne({
      user: session.user.id,
      recipeId: recipeId,
    });

    if (!favorite) {
      return new Response(JSON.stringify({ message: "Recipe not found in favorites" }), {
        status: 404,
      });
    }

    // Delete the specific favorite document
    const deletedFavorite = await Favorite.findByIdAndDelete(favorite._id);

    if (!deletedFavorite) {
      return new Response(JSON.stringify({ message: "Failed to remove recipe" }), {
        status: 500,
      });
    }

    // Successfully removed the recipe from favorites
    return new Response(JSON.stringify({ message: "Recipe removed from favorites" }), {
      status: 200,
    });
  } 
  
  catch (error) {
    return new Response(JSON.stringify({ message: "An error occurred while removing the recipe" }), { status: 500 });
  }
}
