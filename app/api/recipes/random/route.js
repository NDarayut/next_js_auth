import axios from "axios";

export async function GET(){
    const apiKey = process.env.SPOONACULAR_API_KEY; // api key stored in env
    const apiUrl = `https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey}`; // pass in query parameter
    try{
        const response = await axios.get(apiUrl)
        // Extract recipe from response and return the recipe as a JSON
        return new Response(JSON.stringify(response.data.recipes), { status: 200 });
    }

    catch(error){
        console.log("Fetch random recipe error: ", error)
        return new Response(JSON.stringify({ error: "Failed to fetch recipes" }), { status: 500 });
    }
}