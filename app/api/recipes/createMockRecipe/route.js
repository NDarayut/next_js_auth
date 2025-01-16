import RecipeUpdate from "@/models/mockRecipe";
import { connectMongoDB } from "@/lib/mongodb";

/*
    This API will create a copy of the original recipe to temporary store the edited recipe information.
    This will help ensure that the original recipe will still be visible on the website, while the user's
    updated recipe is waiting for admin's approval.
*/
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

        return new Response(JSON.stringify(newRecipe), {status: 200});
    }   
    catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
