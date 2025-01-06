import { connectMongoDB } from "@/lib/mongodb";
import Cuisines from "@/models/cuisines";

export async function GET(request) {
  try {
    await connectMongoDB();

    const cuisines = await Cuisines.find();

    return new Response(JSON.stringify(cuisines), { status: 200 });
  } 
  catch (error) {
    return new Response("Failed to fetch cuisines", { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectMongoDB();

    const { name } = await request.json(); // Expecting name of the cuisine
    const newCuisine = await Cuisines.create({ name });

    return new Response(JSON.stringify(newCuisine), { status: 201 });
  } catch (error) {
    return new Response("Failed to create cuisine", { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectMongoDB()
    const { id, name } = await request.json(); // Expecting id and name for updating
    const updatedCuisine = await Cuisines.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedCuisine) {
      return new Response("Cuisine not found", { status: 404 });
    }
    return new Response(JSON.stringify(updatedCuisine), { status: 200 });
  } catch (error) {
    return new Response("Failed to update cuisine", { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectMongoDB()
    const { id } = await request.json(); // Expecting id of the cuisine to delete
    const deletedCuisine = await Cuisines.findByIdAndDelete(id);
    if (!deletedCuisine) {
      return new Response("Cuisine not found", { status: 404 });
    }
    return new Response(JSON.stringify(deletedCuisine), { status: 200 });
  } catch (error) {
    return new Response("Failed to delete cuisine", { status: 500 });
  }
}
