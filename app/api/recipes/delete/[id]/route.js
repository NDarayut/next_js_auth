import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import { NextResponse } from "next/server";

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
        return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Recipe deleted successfully" }, { status: 200 });
    } 
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  