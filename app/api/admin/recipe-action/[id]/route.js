import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import MockRecipe from "@/models/mockRecipe";
import { NextResponse } from "next/server";


export async function PUT(req, { params }) {
  const { id } = params;
  const { status, currentStatus } = await req.json();

  try {

    await connectMongoDB();

    // If the admin approved the update, we change the original one to match
    // the one from RecipeUpdate schema and delete it
    if(status === "approved" && currentStatus === "pending-update"){

      // Get the recipe data from the RecipeUpdate database
      const updateRequest = await MockRecipe.find({originalRecipeId: id}).select(
        'userId title score sourceName summary image readyInMinutes dishTypes cuisines occasions diets nutrition extendedIngredients analyzedInstructions -_id')
      
      if(!updateRequest){
        return NextResponse.json({error: "Update recipe not found"}, {status: 404})
      }

      // Since find() returns an array, we need the first element (assuming there's only one matching entry)
      const updateData = updateRequest[0]; // Take the first (or only) element from the array

      // Changes the original recipe data to the one from the RecipeUpdate database
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData,{
        new: true, // This ensures that the returned documenty is the updated one and not the original
        runValidators: true, // This ensure that the updated document is the same as the schema
      })

      // Delete the processed update request
      await MockRecipe.findOneAndDelete({ originalRecipeId: id });

      return NextResponse.json({ message: "Status updated successfully", updatedRecipe }, { status: 200 });
    }
    
    // If admin rejects deletion, the original recipe will still be the same, and the mock
    // version will get deleted
    else if(status === "rejected" && currentStatus === "pending-delete"){
      await MockRecipe.findOneAndDelete({ originalRecipeId: id });
      return NextResponse.json({ message: "Status updated successfully"}, { status: 200 });
    }

    // If admin approved creation of recipe, the recipe status will be set to "approved" so it will show up
    // on the website
    else if(status === "approved" && currentStatus === "pending-create"){
      await Recipe.findByIdAndUpdate(id, { status: "approved" }, { // get the ID of the recipe to be updated from the database
        new: true, // This ensures that the returned documenty is the updated one and not the original
        runValidators: true, // This ensure that the updated document is the same as the schema
      });
      return NextResponse.json({ message: "Status updated successfully"}, { status: 200 });
    }

    // If admin reject update request, the mock recipe will be deleted, and nothing change the original
    else if(status === "rejected" && currentStatus === "pending-update"){
      await MockRecipe.findOneAndDelete({ originalRecipeId: id });
      return NextResponse.json({ message: "Status updated successfully"}, { status: 200 });
    }
  } 
  
  catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await connectMongoDB();

    // Find and delete the recipe by ID
    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const mockRecipe = await MockRecipe.find({ originalRecipeId: id })

    if (mockRecipe) {
      // Recipe exists, delete it
      await MockRecipe.findOneAndDelete({ originalRecipeId: id });
    }

    return NextResponse.json({ message: "Recipe deleted successfully" }, { status: 200 });
  } 
  
  catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}