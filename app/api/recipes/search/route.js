import { connectMongoDB } from '@/lib/mongodb';
import Recipe from '@/models/recipe';

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Parse query strings from the request URL
  const query = searchParams.get('query'); // Extract the search query (e.g., ?query=pasta)
  const dishTypes = searchParams.get('dishTypes'); // Extract 'dishTypes' filter
  const cuisines = searchParams.get('cuisines'); // Extract 'cuisines' filter
  const occasions = searchParams.get('occasions'); // Extract 'occasions' filter
  const diets = searchParams.get('diets'); // Extract 'diets' filter

  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Start with a base query
    let filterQuery = {};

    // If there's a query, search by title
    if (query) {
      filterQuery.title = { $regex: query, $options: 'i' }; // Case-insensitive substring match
    }

    // Apply additional filters only if they are present
    if (dishTypes) {
      filterQuery.dishTypes = { $in: dishTypes.split(',') };
    }
    if (cuisines) {
      filterQuery.cuisines = { $in: cuisines.split(',') };
    }
    if (occasions) {
      filterQuery.occasions = { $in: occasions.split(',') };
    }
    if (diets) {
      filterQuery.diets = { $in: diets.split(',') };
    }

    // Fetch recipes based on the constructed query
    const userRecipes = await Recipe.find(filterQuery);

    // Return the matching recipes as a JSON response
    return new Response(JSON.stringify(userRecipes), { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error('Search API Error:', error);

    // Return an error response
    return new Response(
      JSON.stringify({ error: 'Failed to fetch recipes' }),
      { status: 500 }
    );
  }
}
