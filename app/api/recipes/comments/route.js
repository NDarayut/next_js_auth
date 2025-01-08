import { connectMongoDB } from "@/lib/mongodb";
import { updateRecipeScore } from "@/lib/updateRecipeScore";
import Review from "@/models/review";

export async function GET() {
  
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch all comments from the database
    const comments = await Review.find();

    console.log("connected to comment")

    // Return the comments as a JSON response
    return new Response(JSON.stringify(comments), { status: 200 });
  } 
  
  catch (error) {
    console.error("Error fetching comments:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch comments" }), { status: 500 });
  }
}

export async function DELETE(req) {
    try {
      const { commentId, recipeId } = await req.json(); // Get the commentId from the request body
  
      // Connect to MongoDB
      await connectMongoDB();
  
      // Delete the comment by its ID
      const deletedComment = await Review.findByIdAndDelete(commentId);

      // When user post a comment, we will re-calculate the Score and Rating of that recipes
      await updateRecipeScore(recipeId);
  
      if (!deletedComment) {
        return new Response(JSON.stringify({ error: 'Comment not found' }), { status: 404 });
      }
  
      // Return the deleted comment's ID
      return new Response(JSON.stringify({ message: 'Comment deleted', commentId }), { status: 200 });
    } 
    
    catch (error) {
      console.error("Error deleting comment:", error);
      return new Response(JSON.stringify({ error: "Failed to delete comment" }), { status: 500 });
    }
  }
