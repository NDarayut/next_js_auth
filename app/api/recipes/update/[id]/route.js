import Recipe from "@/models/recipe";
import { connectMongoDB } from "@/lib/mongodb";

/*
    This API will update the recipe information based on its ID.
    This API is used by the admin to automatically update a recipe's detail.
*/
export async function PUT(req, { params }) {
    const { id } = params;

    try {
        await connectMongoDB();

        const body = await req.json(); // read the json body that contain the updated field

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, body, { // get the ID of the recipe to be updated from the database
            new: true, // This ensures that the returned documenty is the updated one and not the original
            runValidators: true, // This ensure that the updated document is the same as the schema
        });

        // validation if the ID wasnt found
        if (!updatedRecipe) {
            return new Response(JSON.stringify({ error: "Recipe not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(updatedRecipe), { status: 200 });
    } 

    catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
