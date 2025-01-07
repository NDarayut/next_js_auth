import mongoose from "mongoose";
const  {Schema, models} = mongoose;

const dishtypeSchema = new Schema(
    {
    name: { type: String, required: true },
    }
)

// check if we have a models, if we dont, we create a new one
const Dishtypes = models.Dishtypes ||  mongoose.model("Dishtypes", dishtypeSchema)

// we export the object so that it can be used in other file
export default Dishtypes