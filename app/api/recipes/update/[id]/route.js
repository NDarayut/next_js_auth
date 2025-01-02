import Recipe from "@/models/recipe";
import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

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
            return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
        }

        return NextResponse.json(updatedRecipe, { status: 200 });
        } 

    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
