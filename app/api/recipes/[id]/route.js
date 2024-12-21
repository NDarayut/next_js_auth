import { connectMongoDB } from '@/lib/mongodb';
import Recipe from '@/models/recipe';
import axios from 'axios';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  const { id } = params; // Extract the dynamic `id` parameter from the route
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=true`;


  try {
    await connectMongoDB()
    
    if (mongoose.Types.ObjectId.isValid(id)) {
      // If it's a valid MongoDB ObjectId, search in the database
      await connectMongoDB();
      
      const userRecipe = await Recipe.findById(id);

      if (userRecipe) {
        // If a user-created recipe is found in MongoDB, return it
        return new Response(JSON.stringify(userRecipe.toObject()), { status: 200 });
      }
    }

    else{
      // Use axios to make the HTTP GET request
      const response = await axios.get(apiUrl);
      // Return successful response with recipe data
      return new Response(JSON.stringify(response.data), { status: 200 });
    }
    

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
