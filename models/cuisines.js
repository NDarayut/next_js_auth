import mongoose from "mongoose";
const  {Schema, models} = mongoose;

const cuisineSchema = new Schema(
    {
        name: { type: String, required: true },
    }
)

// check if we have a models, if we dont, we create a new one
const Cuisines = models.Cuisines ||  mongoose.model("Cuisines", cuisineSchema)

// we export the object so that it can be used in other file
export default Cuisines