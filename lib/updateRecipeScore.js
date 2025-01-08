import Recipe from "@/models/recipe";
import Review from "@/models/review";

export async function updateRecipeScore(recipeId) {
  try {
    // Fetch all reviews for the given recipe ID
    const reviews = await Review.find({ recipeId });

    // Function to calculate score
    function calculateScore(reviews) {
      /*
      Score = AverageRating * Log(Number of Reviews + 1)
      - Recipe with more reviews is considered more popular.
      - Logarithmic factor prevents score inflation due to a high number of reviews.
      */

      // Step 1: Calculate the sum of all ratings
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

      // Step 2: Calculate the average rating
      const averageRating = totalRating / reviews.length;

      // Step 3: Calculate the number of reviews
      const numberOfReviews = reviews.length;

      // Step 4: Calculate the logarithmic factor
      const logarithmicFactor = Math.log(numberOfReviews + 1);

      // Step 5: Combine average rating with the logarithmic factor
      const score = averageRating * logarithmicFactor;

      return { score, averageRating };
    }

    // Handle the case where no reviews exist
    let simplePopularityScore = 0;
    let averageRating = 0;

    if (reviews.length > 0) {
      const result = calculateScore(reviews);
      simplePopularityScore = result.score;
      averageRating = result.averageRating;
    }

    // Update the score and average rating in the Recipe model
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        score: simplePopularityScore,
        averageRating: averageRating,
      },
      { new: true } // Return the updated document
    );

    return updatedRecipe.score; // Return the updated score
  } catch (error) {
    console.error("Error updating recipe score:", error);
    throw new Error("Could not update recipe score");
  }
}
