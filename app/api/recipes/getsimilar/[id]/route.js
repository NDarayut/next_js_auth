import axios from "axios";
import Recipe from "@/models/recipe";
import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { id } = params; // MongoDB or Spoonacular ID
  const apiKey = process.env.SPOONACULAR_API_KEY;

  try {
    // Step 1: Connect to MongoDB
    await connectMongoDB();

    let recipeDetail = {};
    const isMongoDBId = ObjectId.isValid(id) && id.length === 24;

    if (isMongoDBId) {
      // If it's a MongoDB ID, fetch the recipe from the database
      recipeDetail = await Recipe.findById(id).exec();
    } 
    else {
      // If it's a Spoonacular ID, fetch the recipe details from the Spoonacular API
      const detailResponse = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}`
      )
      return new Response(JSON.stringify(detailResponse.data), { status: 200 });
    }

    // Extract relevant fields for matching
    const { dishTypes = [], diets = [], occasions = [] } = recipeDetail;

    // Step 2: Query MongoDB for similar recipes
    const dbRecipes = await Recipe.find({
      $expr: {
        $gte: [
          {
            $add: [
              {
                $cond: [
                  { $gt: [{ $size: { $setIntersection: ["$dishTypes", dishTypes] } }, 0] },
                  1,
                  0,
                ],
              },
              {
                $cond: [
                  { $gt: [{ $size: { $setIntersection: ["$diets", diets] } }, 0] },
                  1,
                  0,
                ],
              },
              {
                $cond: [
                  { $gt: [{ $size: { $setIntersection: ["$occasions", occasions] } }, 0] },
                  1,
                  0,
                ],
              },
            ],
          },
          2, // At least 2 keys must match
        ],
      },
      _id: { $ne: new ObjectId(id) }, // Exclude the current recipe
    }).exec();

    // Step 3: Return the results
    return new Response(JSON.stringify(dbRecipes), { status: 200 });
  } catch (error) {
    console.error("Fetch similar recipe error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), { status: 500 });
  }
}
