import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

export async function GET() {
  try {
    await connectMongoDB();

    // Fetch pending recipes with desired fields
    const pendingRecipes = await Recipe.find(
      { status:  { $in: ["pending-create", "pending-delete", "pending-update"] } },
      { _id: 1, title: 1, status: 1 } // Specify fields to retrieve
    );

    // Format the response
    const recipes = pendingRecipes.map((recipe) => ({
      id: recipe._id,
      title: recipe.title,
      status: recipe.status,
    }));

    return new Response(JSON.stringify({ recipes }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch pending recipes." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
