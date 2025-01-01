import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

export async function PATCH(req) {
  try {
    await connectMongoDB();

    // Parse request body
    const { id, status } = await req.json();
    console.log({id, status})

    // Validate input
    if (!id || !["approved", "rejected"].includes(status)) {
      return new Response(
        JSON.stringify({ error: "Invalid input: ID and valid status are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update the recipe's status in the database
    const result = await Recipe.updateOne({ _id: id }, { status });

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Recipe not found or status already updated." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: `Recipe status updated to '${status}' successfully.` }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } 
  catch (error) {
    console.error("Error updating recipe status:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update the recipe status." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
