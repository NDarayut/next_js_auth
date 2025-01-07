import { connectMongoDB } from "@/lib/mongodb";
import Dishtypes from "@/models/dishtypes";
import { NextResponse } from "next/server";
import slugify from "slugify";  // Install slugify: npm install slugify

export async function GET(request) {
  try {
    await connectMongoDB();

    const dishTypes = await Dishtypes.find();

    return new Response(JSON.stringify(dishTypes), { status: 200 });

  } 
  catch (error) {
    return new Response("Failed to fetch dish types", { status: 500 });
  }
}

export async function POST(request) {
  try {

    await connectMongoDB()
    const { name } = await request.json(); // Expecting name of the dish type

    // Slugify the dish type name to standardize it (lowercase, hyphenated)
    const slugifiedName = slugify(name.toLowerCase(), { lower: true });

    const newDishType = await Dishtypes.create({ name: slugifiedName });
    return NextResponse.json(newDishType, {status: 201})
  } 
  catch (error) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}

export async function PUT(request) {
  try {
    await connectMongoDB()
    const { id, name } = await request.json(); // Expecting id and name for updating
    // Slugify the name to ensure consistency in format (lowercase, hyphenated)
    const slugifiedName = slugify(name.toLowerCase(), { lower: true });

    // Update the dish type with the slugified name
    const updatedDishType = await Dishtypes.findByIdAndUpdate(id, { name: slugifiedName }, { new: true });

    if (!updatedDishType) {
      return new Response("Dish type not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedDishType), { status: 200 });
  } catch (error) {
    return new Response("Failed to update dish type", { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectMongoDB()
    const { id } = await request.json(); // Expecting id of the dish type to delete
    const deletedDishType = await Dishtypes.findByIdAndDelete(id);
    if (!deletedDishType) {
      return new Response("Dish type not found", { status: 404 });
    }
    return new Response(JSON.stringify(deletedDishType), { status: 200 });
  } catch (error) {
    return new Response("Failed to delete dish type", { status: 500 });
  }
}
