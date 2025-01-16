import { connectMongoDB } from "@/lib/mongodb";
import Cuisines from "@/models/cuisines";
import slugify from "slugify"; // Install slugify: npm install slugify

/*
  This API fetch all cuisines types
*/
export async function GET(request) {
  try {
    await connectMongoDB();

    const cuisines = await Cuisines.find();

    return new Response(JSON.stringify( cuisines ), { status: 200 });
  } 
  
  catch (error) {
    return new Response(JSON.stringify("Failed to fetch cuisines"), { status: 500 });
  }
}

/*
  This API will create a cuisine and store it in the database
*/
export async function POST(request) {
  try {
    await connectMongoDB();

    const { name } = await request.json(); // Expecting name of the cuisine

    // Slugify the dish type name to standardize it (lowercase, hyphenated)
    const slugifiedName = slugify(name.toLowerCase(), { lower: true });

    const newCuisine = await Cuisines.create({ name: slugifiedName });

    return new Response(JSON.stringify(newCuisine ), { status: 201 });
  } 
  
  catch (error) {
    return new Response(JSON.stringify("Failed to create cuisine"), { status: 500 });
  }
}

/*
  This API will update any cuisine based on its ID
  Example: Update America -> American
*/
export async function PUT(request) {
  try {
    await connectMongoDB();
    const { id, name } = await request.json(); // Expecting id and name for updating
    // Slugify the name to ensure consistency in format (lowercase, hyphenated)
    const slugifiedName = slugify(name.toLowerCase(), { lower: true });

    const updatedCuisine = await Cuisines.findByIdAndUpdate(
      id,
      { name: slugifiedName },
      { new: true }
    );

    if (!updatedCuisine) {
      return new Response(
        JSON.stringify("Cuisine not found"), { status: 404 });
    }
    return new Response(JSON.stringify(updatedCuisine), { status: 200 });
  } 
  
  catch (error) {
    return new Response(
      JSON.stringify("Failed to update cuisine"),
      { status: 500 }
    );
  }
}

/*
  Delete cuisine type based on ID
*/
export async function DELETE(request) {
  try {
    await connectMongoDB();
    const { id } = await request.json(); // Expecting id of the cuisine to delete
    const deletedCuisine = await Cuisines.findByIdAndDelete(id);
    if (!deletedCuisine) {
      return new Response(
        JSON.stringify({ error: "Cuisine not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(deletedCuisine ), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to delete cuisine"), { status: 500 });
  }
}
