import mongoose from "mongoose";
const { Schema, models } = mongoose;

const favoriteSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    recipeId: {
      type: String, // ID of the recipe
      required: true,
    },
  },
  { timestamps: true }
);

// Check if the model already exists to avoid recompilation errors
const Favorite = models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;
