import { NextResponse } from "next/server";
import RecipeUpdate from "@/models/mockRecipe";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req) {
    try {
        await connectMongoDB();

        const {originalRecipeId, score, title, sourceName, summary, image, readyInMinutes, dishTypes = [], cuisines = [],
            occasions = [], diets = [], nutrition = {nutrients: []}, extendedIngredients = [], analyzedInstructions = [], userId, status
        } = await req.json()

        const newRecipe = await RecipeUpdate.create({
          originalRecipeId,
          title,
          status,
          userId,
          score,
          sourceName,
          summary,
          image,
          readyInMinutes,
          dishTypes,
          cuisines,
          occasions,
          diets,
          nutrition,
          extendedIngredients,
          analyzedInstructions,
        })

        return NextResponse.json(newRecipe, {status: 201})
    }   
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
