import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

/*
  This API will fetch all the recipe with the associated dishtypes value.
  Example, if dishtypes/dessert is called, then it will fetch all dessert recipes.
*/
export async function GET(req, { params }) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Destructure the dishTypes from the URL
    const { dishtypes } = params;

    // Query the Recipe model to find recipes with the provided dishTypes
    const recipes = await Recipe.find({
      dishTypes: { $in: [dishtypes] },  // Find recipes where the dishTypes array contains the given dishtypes
      status: "approved",
    });

    // Return the matching recipes as JSON
    return new Response(JSON.stringify(recipes), { status: 200 });
  } 
  
  catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), {
      status: 500,
    });
  }
}
