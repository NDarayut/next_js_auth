import Review from "@/models/review";
import { connectMongoDB } from "@/lib/mongodb";
import { updateRecipeScore } from "@/lib/updateRecipeScore";

/* 
  This API will get all the comments from a recipe based on the recipe's ID
*/
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

/*
  This API will input a comment's information based on the recipe's ID
  comment's information includes: recipeID, userID, username (user who commented), rating, and the comment itself
*/
export async function POST(req, { params }) {
    const { id } = params; // Recipe ID
    const { userId, username, rating, comment } = await req.json();
  
    try {
      await connectMongoDB();

      const newReview = new Review({ recipeId: id, userId, username, rating, comment });
      await newReview.save();

      // When user post a comment, we will re-calculate the Score and Rating of that recipes
      await updateRecipeScore(id);
  
      return new Response(JSON.stringify(newReview), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to add review" }), { status: 500 });
    }
  }