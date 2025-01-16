import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import MockRecipe from "@/models/mockRecipe";

/*
  This API will make changes to the recipe if the admin does not approve of deleting the recipe
*/
export async function PUT(req, { params }) {
  const { id } = params;
  const { status, currentStatus } = await req.json();

  try {
    await connectMongoDB();

    if(status === "approved" && currentStatus === "pending-update"){
      const updateRequest = await MockRecipe.find({originalRecipeId: id}).select(
        'userId title score sourceName summary image readyInMinutes dishTypes cuisines occasions diets nutrition extendedIngredients analyzedInstructions -_id');
      
      if(!updateRequest){
        return new Response(JSON.stringify({error: "Update recipe not found"}), {status: 404});
      }

      const updateData = updateRequest[0];

      const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData,{
        new: true,
        runValidators: true,
      });

      await MockRecipe.findOneAndDelete({ originalRecipeId: id });

      return new Response(JSON.stringify({ message: "Status updated successfully", updatedRecipe }), { status: 200 });
    }

    else if(status === "rejected" && currentStatus === "pending-delete"){
      await MockRecipe.findOneAndDelete({ originalRecipeId: id });
      return new Response(JSON.stringify({ message: "Status updated successfully"}), { status: 200 });
    }

    else if(status === "approved" && currentStatus === "pending-create"){
      await Recipe.findByIdAndUpdate(id, { status: "approved" }, {
        new: true,
        runValidators: true,
      });
      return new Response(JSON.stringify({ message: "Status updated successfully"}), { status: 200 });
    }

    else if(status === "rejected" && currentStatus === "pending-update"){
      await MockRecipe.findOneAndDelete({ originalRecipeId: id });
      return new Response(JSON.stringify({ message: "Status updated successfully"}), { status: 200 });
    }
  } 
  
  catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

/*
  This API will delete the recipe from both the original recipe model and the temporary recipe model
*/
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();

    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return new Response(JSON.stringify({ error: "Recipe not found" }), { status: 404 });
    }

    const mockRecipe = await MockRecipe.find({ originalRecipeId: id });

    if (mockRecipe) {
      await MockRecipe.findOneAndDelete({ originalRecipeId: id });
    }

    return new Response(JSON.stringify({ message: "Recipe deleted successfully" }), { status: 200 });
  } 
  
  catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
