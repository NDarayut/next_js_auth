import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import MockRecipe from "@/models/mockRecipe";

export async function GET() {
  try {
    await connectMongoDB();

    // Fetch pending recipes with desired fields
    const pendingRecipes = await Recipe.find(
      { status:  { $in: ["pending-create"] } },
      { _id: 1, title: 1, status: 1 } // Specify fields to retrieve
    );

    // Fetch pending recipes with desired fields
    const pendingMockRecipes = await MockRecipe.find(
      { status:  { $in: ["pending-update", "pending-delete"] } },
      { originalRecipeId: 1, title: 1, status: 1 } // Specify fields to retrieve
    );

    // Format and combine the results
    const recipes = [
      ...pendingRecipes.map((recipe) => ({
        id: recipe._id,
        title: recipe.title,
        status: recipe.status,
      })),

      ...pendingMockRecipes.map((recipe) => ({
        id: recipe.originalRecipeId,
        title: recipe.title,
        status: recipe.status,
      })),
    ];

    return new Response(JSON.stringify(recipes), { status: 200 });
  } 
  
  catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch pending recipes." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
