// /api/favorite/[userId]/route.js
import { connectMongoDB } from "@/lib/mongodb";
import Favorite from "@/models/favorite";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { userId } = params;

  try {
    await connectMongoDB();

    // Find all favorite recipes for the user
    const favorites = await Favorite.find({ user: userId });

    if (!favorites.length) {
      return NextResponse.json({ message: "No favorites found" }, { status: 404 });
    }

    // Fetch recipe details from the external API for each recipeId
    const recipeDetails = await Promise.all(
      favorites.map(async (fav) => {
        const response = await fetch(`https://api.spoonacular.com/recipes/${fav.recipeId}/information`);
        return response.ok ? response.json() : null;
      })
    );

    return NextResponse.json(recipeDetails.filter(Boolean), { status: 200 });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
