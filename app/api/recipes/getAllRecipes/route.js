import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

/*
  This API fetch all recipe on the website.
  This API is used by the admin to monitor all recipe on the website.
*/
export async function GET(req) {
  try {
    // Get the query parameters for pagination (default values if not provided)
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1
    const limit = parseInt(searchParams.get("limit")) || 20; // Default to 20 recipes per page
    const skip = (page - 1) * limit;

    // Connect to MongoDB
    await connectMongoDB();

    // Fetch the recipes with pagination
    const recipes = await Recipe.find().skip(skip).limit(limit);

    // Return the recipes as a JSON response
    return new Response(JSON.stringify(recipes), { status: 200 });
  } 
  
  catch (error) {
    console.error("Error fetching recipes:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), { status: 500 });
  }
}
