import { connectMongoDB } from '@/lib/mongodb';
import Recipe from '@/models/recipe';

/*
  This API will fetch the recipe based on the query string.
  This API will also fetch recipe based on filter option
  Example: If the query is "hamburger" and cuisines is "american", it will fetch all american hamburger recipes.
*/
export async function GET(req) {
  const { searchParams } = new URL(req.url); // Parse query strings from the request URL
  const query = searchParams.get('query'); // Extract the search query
  const dishTypes = searchParams.get('dishTypes'); // Extract 'dishTypes' filter
  const cuisines = searchParams.get('cuisines'); // Extract 'cuisines' filter

  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Start with a base query
    let filterQuery = { status: "approved" };

    // If there's a query, search by title
    if (query) {
      filterQuery.title = { $regex: query, $options: 'i' }; // Case-insensitive substring match
    }

    // Apply additional filters only if they are present
    if (dishTypes) {
      filterQuery.dishTypes = { $all: dishTypes.split(',') };
    }
    
    if (cuisines) {
      filterQuery.cuisines = { $all: cuisines.split(',') };
    }

    console.log(filterQuery)
    // Fetch recipes based on the constructed query
    const userRecipes = await Recipe.find(filterQuery);

    // Return the matching recipes as a JSON response
    return new Response(JSON.stringify(userRecipes), { status: 200 });
  } 
  
  catch (error) {
    // Return an error response
    return new Response(JSON.stringify({ error: 'Failed to fetch recipes' }), { status: 500 });
  }
}
