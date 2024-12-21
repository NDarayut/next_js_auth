// models/Review.js
import mongoose from "mongoose";
const  {Schema, models} = mongoose;

const reviewSchema = new Schema({
  recipeId: {
    type: String, // Reference to the recipe
    required: true,
  },
  userId: {
    type: String, // Reference to the user
    required: true,
  },
  rating: {
    type: Number, // Rating (e.g., 1-5 stars)
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String, // User comment
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// check if we have a models, if we dont, we create a new one
const Review = models.Review ||  mongoose.model("Review", reviewSchema)

// we export the object so that it can be used in other file
export default Review


