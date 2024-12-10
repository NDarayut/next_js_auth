import mongoose from "mongoose";
const  {Schema, models} = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
},
    {timestamps: true}
)

// check if we have a models, if we dont, we create a new one
const User = models.User ||  mongoose.model("User", userSchema)

// we export the object so that it can be used in other file
export default User