import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

export async function GET(req, { params }) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Destructure the cuisines from the URL
    const { cuisines } = params;

    // Query the Recipe model to find recipes with the provided cuisines
    const recipes = await Recipe.find({
      cuisines: { $in: [cuisines] }  // Find recipes where the cuisines array contains the given cuisines
    });

    // Return the matching recipes as JSON
    return new Response(JSON.stringify(recipes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } 
  
  catch (error) {
    console.error("Error fetching recipes by cuisines:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), {
      status: 500,
    });
  }
}
