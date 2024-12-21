// app/api/recipes/[id]/reviews/route.js
import Review from "@/models/review";
import { connectMongoDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth"; // For session validation

export async function GET(req, { params }) {
  const { id } = params; // Recipe ID
  try {
    await connectMongoDB();
    const reviews = await Review.find({ recipeId: id }).populate("userId", "username"); // Include username
    return new Response(JSON.stringify(reviews), { status: 200 });
  } 
  catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch reviews" }), { status: 500 });
  }
}


export async function POST(req, { params }) {
    const { id } = params; // Recipe ID
    const { userId, rating, comment } = await req.json();
  
    try {
      await connectMongoDB();
      const newReview = new Review({ recipeId: id, userId, rating, comment });
      await newReview.save();
  
      return new Response(JSON.stringify(newReview), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to add review" }), { status: 500 });
    }
  }