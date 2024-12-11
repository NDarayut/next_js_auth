import { getServerSession } from "next-auth";
import Favorite from "@/models/favorite";      // Import the Favorite model
import { NextResponse } from "next/server";   // Import NextResponse
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    // Get the session on the server-side
    const session = await getServerSession(authOptions);
    console.log("Session Data Favorite:", session?.user);  // Log session data to debug
    console.log("Session Data Favorite ID:", session?.user?.id);  // Log session data to debug
    
    if (!session?.user) {
      return NextResponse.json({ message: "User is not logged in" }, { status: 401 });
    }

    // Get the recipe ID from the request body
    const { recipeId } = await req.json();  

    if (!recipeId) {
      return NextResponse.json({ message: "Recipe ID is required." }, { status: 400 });
    }

    // Connect to the database
    await connectMongoDB();

    // Check if the recipe is already favorited by the user
    const existingFavorite = await Favorite.findOne({ user: session.user.id, recipeId });

    if (existingFavorite) {
      return NextResponse.json({ message: "Recipe already favorited" }, { status: 400 });
    }

    // Create a new Favorite document
    const newFavorite = new Favorite({
      user: session.user.id,  // The logged-in user's ID
      recipeId: recipeId,     // The recipe ID
    });

    // Save the new favorite
    await newFavorite.save();

    return NextResponse.json({ message: "Recipe favorited successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
