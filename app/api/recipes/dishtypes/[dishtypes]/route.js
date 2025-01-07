import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

export async function GET(req, { params }) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Destructure the dishTypes from the URL
    const { dishtypes } = params;

    // Query the Recipe model to find recipes with the provided dishTypes
    const recipes = await Recipe.find({
      dishTypes: { $in: [dishtypes] }  // Find recipes where the dishTypes array contains the given dishtypes
    });

    // Return the matching recipes as JSON
    return new Response(JSON.stringify(recipes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } 
  
  catch (error) {
    console.error("Error fetching recipes by dishType:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), {
      status: 500,
    });
  }
}
