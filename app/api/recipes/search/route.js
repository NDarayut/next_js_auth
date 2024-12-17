import axios from 'axios';  // Use for HTTP request

// GET request function, req represents incomming HTTP request
export async function GET(req) {
  const { searchParams } = new URL(req.url); // Convert request URL into a URL object
  const query = searchParams.get('query'); // Extract 'query' parameter e,g,. ?query=pasta to query="pasta"
  /*
  // Mock Recipe Data
  const mockRecipes = [
    {
      id: 1,
      title: 'Spaghetti Bolognese',
      image: 'italian.jpg',
      summary: 'A classic Italian pasta dish made with a rich, savory meat sauce.',
      readyInMinutes: 30,
      servings: 4,
      instructions: 'Cook the spaghetti and mix with the bolognese sauce.',
    },
    {
      id: 2,
      title: 'Chicken Alfredo',
      image: 'https://via.placeholder.com/150',
      summary: 'Creamy alfredo sauce paired with tender chicken and pasta.',
      readyInMinutes: 25,
      servings: 4,
      instructions: 'Cook the pasta, prepare the alfredo sauce, and serve with grilled chicken.',
    },
    {
      id: 3,
      title: 'Vegetable Stir Fry',
      image: 'https://via.placeholder.com/150',
      summary: 'A healthy mix of colorful vegetables stir-fried with a savory sauce.',
      readyInMinutes: 20,
      servings: 2,
      instructions: 'Stir fry the vegetables in a hot pan with soy sauce and spices.',
    },
    {
      id: 4,
      title: 'Beef Tacos',
      image: 'https://via.placeholder.com/150',
      summary: 'Ground beef cooked with spices and served in soft taco shells.',
      readyInMinutes: 15,
      servings: 3,
      instructions: 'Cook the ground beef, prepare toppings, and assemble the tacos.',
    },
    {
      id: 5,
      title: 'Vegetarian Pizza',
      image: 'https://via.placeholder.com/150',
      summary: 'A pizza topped with fresh vegetables and mozzarella cheese.',
      readyInMinutes: 25,
      servings: 4,
      instructions: 'Top the pizza dough with sauce, vegetables, and cheese, then bake.',
    },

    {
      id: 6,
      title: 'Spaghetti Bolognese',
      image: 'italian.jpg',
      summary: 'A classic Italian pasta dish made with a rich, savory meat sauce.',
      readyInMinutes: 30,
      servings: 4,
      instructions: 'Cook the spaghetti and mix with the bolognese sauce.',
    },

    {
      id: 7,
      title: 'Spaghetti Bolognese',
      image: 'italian.jpg',
      summary: 'A classic Italian pasta dish made with a rich, savory meat sauce.',
      readyInMinutes: 30,
      servings: 4,
      instructions: 'Cook the spaghetti and mix with the bolognese sauce.',
    },

    {
      id: 8,
      title: 'Spaghetti Bolognese',
      image: 'italian.jpg',
      summary: 'A classic Italian pasta dish made with a rich, savory meat sauce.',
      readyInMinutes: 30,
      servings: 4,
      instructions: 'Cook the spaghetti and mix with the bolognese sauce.',
    },

    {
      id: 9,
      title: 'Spaghetti Bolognese',
      image: 'italian.jpg',
      summary: 'A classic Italian pasta dish made with a rich, savory meat sauce.',
      readyInMinutes: 30,
      servings: 4,
      instructions: 'Cook the spaghetti and mix with the bolognese sauce.',
    },
  ];


  const filteredRecipes = mockRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );

  return new Response(JSON.stringify(filteredRecipes), { status: 200 });
  */
  
  const apiKey = process.env.SPOONACULAR_API_KEY; // api key stored in env
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=20&apiKey=${apiKey}`; // pass in query parameter

  try {
    // Use axios to make the HTTP GET request from the spoonacular api
    const response = await axios.get(apiUrl); 

    // Extract recipe from response and return the recipe as a JSON
    return new Response(JSON.stringify(response.data.results), { status: 200 });
  } 
  catch (error) {
    // Handle any errors and return error response
    console.error(error); // Optionally log the error for debugging
    return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), { status: 500 });
  }
    


}
