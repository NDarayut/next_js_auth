import { NextResponse } from "next/server";
import Recipe from "@/models/recipe"; // Adjust the path if your model is in a different directory
import { connectMongoDB } from "@/lib/mongodb"; // Adjust the path if your MongoDB connection function is elsewhere

export async function GET(req, { params }) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    const { cuisines } = params; // Corrected to use the 'cuisines' parameter from the path
    if (!cuisines) {
      return NextResponse.json(
        { error: "Please provide a cuisine" },
        { status: 400 }
      );
    }

    // Create a case-insensitive regular expression for the cuisine
    const regex = new RegExp(`^${cuisines}$`, "i");

    // Query the database for recipes matching the cuisine (case-insensitive)
    const recipes = await Recipe.find({
      cuisines: { $in: [regex] }
    });
    
    return new Response(JSON.stringify( recipes ), { status: 200 });
  } catch (error) {
    console.error("Error fetching recipes by cuisine:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
