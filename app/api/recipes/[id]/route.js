import { connectMongoDB } from '@/lib/mongodb';
import Recipe from '@/models/recipe';

/*
  This api will get a recipe's detailed information based on their ID
*/

export async function GET(req, { params }) {
  const { id } = params; // Extract the dynamic `id` parameter from the route
  try {
    await connectMongoDB()
    
    const userRecipe = await Recipe.findById(id);
    return new Response(JSON.stringify(userRecipe.toObject()), { status: 200 });

  } 
  
  catch (error) {
    // Handle any errors and return error response
    console.error(error); // Optionally log the error for debugging
    return new Response(
      JSON.stringify({ error: 'Failed to fetch recipe details' }),
      { status: 500 }
    );
  }
}
