import { connectMongoDB } from '@/lib/mongodb';
import Recipe from '@/models/recipe';
import axios from 'axios';

export async function GET(req) {
  const { searchParams } = new URL(req.url); // Query strings from the request URL
  const query = searchParams.get('query'); // Extract 'query' parameter e.g., ?query=pasta to query="pasta"
  const dishTypes = searchParams.get('dishTypes'); // Extract 'dishTypes' filter
  const cuisines = searchParams.get('cuisines'); // Extract 'cuisines' filter
  const occasions = searchParams.get('occasions'); // Extract 'occasions' filter
  const diets = searchParams.get('diets'); // Extract 'diets' filter
  
  const apiKey = process.env.SPOONACULAR_API_KEY; // API key stored in env
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&cuisine=${cuisines}&diet=${diets}&dishtypes=${dishTypes}&occasions=${occasions}&number=20&apiKey=${apiKey}`;

  try {

    await connectMongoDB();
    
    // A MongoDB query object dynamically built using user-provided filters
    const filterQuery = {
      title: { $regex: query, $options: 'i' }, // search for title match with case insensitive
    };
    
    // check for that specific dishtypes in the dishTypes array (e.g., dishTypes:["dessert", "appetizer"])
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

    // Search MongoDB for matching recipes
    const userRecipes = await Recipe.find(filterQuery);

    // Use axios to make the HTTP GET request from the Spoonacular API
    const response = await axios.get(apiUrl);
    const spoonacularRecipes = response.data.results;

    // Combine user-created recipes and Spoonacular API results
    const combinedRecipes = [...userRecipes, ...spoonacularRecipes];

    return new Response(JSON.stringify(combinedRecipes), { status: 200 });
  } 

  catch (error) {
    console.error(error); // Optionally log the error for debugging
    return new Response(
      JSON.stringify({ error: 'Failed to fetch recipes' }),
      { status: 500 }
    );
  }
}
