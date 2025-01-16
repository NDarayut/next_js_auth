import Recipe from "@/models/recipe";
import { connectMongoDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/*
  This API fetch all recipe that has the same dishtypes, and cusisines value.
  This API only fetch recipe with atleast 2 common attributes (cuisines, and dishtypes)
  IF there is 2 matching cuisines and 0 matching dishtypes, the recipe will not be fetched
*/
export async function GET(req, { params }) {
  const { id } = params; // MongoDB or Spoonacular ID

  try {
    //  Connect to MongoDB
    await connectMongoDB();

    let recipeDetail = {};
    const isMongoDBId = ObjectId.isValid(id) && id.length === 24;

    if (isMongoDBId) {
      // If it's a MongoDB ID, fetch the recipe from the database
      recipeDetail = await Recipe.findById(id).exec();
    } 

    // Extract relevant fields for matching
    const { dishTypes = [], cuisines = [] } = recipeDetail;

    //  Query MongoDB for similar recipes
    const dbRecipes = await Recipe.find({
      $expr: { // Allow the query to evaluate aggregation expression
        $gte: [ // Calculate if the similar score is greater or equal to 2 (Maximum is 2)
          {
            $add: [ // Sums up the 2 condition below
              {
                $cond: [ // If there is at least one recipe with the same dishtypes as the current recipe
                        // add 1 to the scores
                  { $gt: [{ $size: { $setIntersection: ["$dishTypes", dishTypes] } }, 0] },
                  1,
                  0,
                ],
              },
              {
                $cond: [
                  { $gt: [{ $size: { $setIntersection: ["$cuisines", cuisines] } }, 0] },
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

    //  Return the results
    return new Response(JSON.stringify(dbRecipes), { status: 200 });
  } 
  
  catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), { status: 500 });
  }
}
