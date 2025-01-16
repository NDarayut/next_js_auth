import { connectMongoDB } from "@/lib/mongodb";
import Recipe from "@/models/recipe";
import { NextResponse } from "next/server";

/*
  This API creates a recipe with all the necessary information.
  The API is used by both Admin and User
*/
export async function POST(req){
    try{

      await connectMongoDB()

      const {title, sourceName, summary, image, readyInMinutes, dishTypes = [], cuisines = [],
          occasions = [], diets = [], nutrition = {nutrients: []}, extendedIngredients = [], analyzedInstructions = [], userId, status
      } = await req.json()

      const newRecipe = await Recipe.create({
        title,
        status,
        userId,
        score: 0,
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
    catch (error){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}