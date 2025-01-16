import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";

/*
    This API will delete any recipe based on their ID.
    This API is used by the admin to quickly delete any recipe.
*/
export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        await connectMongoDB();
        
        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return new Response(JSON.stringify({error: "Recipe not found"}), {status: 404});
        }
        
        return new Response(JSON.stringify({message: "Recipe not found"}), {status: 200});
    } 
    catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status: 500});
    }
  }
  