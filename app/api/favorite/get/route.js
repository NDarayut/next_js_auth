import { getServerSession } from "next-auth";
import Favorite from "@/models/favorite";      // Import the Favorite model
import { NextResponse } from "next/server";   // Import NextResponse
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(req) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Extract user ID from the request query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    // Find all favorite recipes for the user
    const favorites = await Favorite.find({ user: userId }).select("recipeId");

    return NextResponse.json({ favorites }, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
    