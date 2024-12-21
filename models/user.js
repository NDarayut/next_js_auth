import mongoose from "mongoose";
const  {Schema, models} = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
    },

    profilePicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: " fs.files",
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