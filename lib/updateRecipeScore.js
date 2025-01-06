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

    Recipe with a lot of reviews get their popularity, even if some reviews are bad.

    Example: 
        Recipe A: 2 reviews, both 5 star will be less popular than Recipe B with 5 reviews (4 of which
        is 5 stars, and 1 of which is 3 stars)

    Why log(numberOfReviews)?
    - Prevent the score from being too high if there are a lot of reviews.
    - Adding 1 to numberOfReviews, ensure that log(0) does not happen
    */

        // Step 1: Calculate the sum of all ratings
        let totalRating = 0;
        for (let i = 0; i < reviews.length; i++) {
            totalRating += reviews[i].rating;
        }

        // Step 2: Calculate the average rating 
        const averageRating = totalRating / reviews.length;

        // Step 3: Calculate the number of reviews (V)
        const numberOfReviews = reviews.length;

        // Step 4: Calculate the logarithmic factor (log(V + 1))
        const logarithmicFactor = Math.log(numberOfReviews + 1);

        // Step 5: Combine average rating (R) with the logarithmic factor
        const score = averageRating * logarithmicFactor;

        return {score, averageRating};
    }

    const { score: simplePopularityScore, averageRating }  = (reviews.length > 0) ? calculateScore(reviews) : 0;

    // Update the score in the Recipe model
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
