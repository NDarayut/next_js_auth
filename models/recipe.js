import mongoose from "mongoose";
const  {Schema, models} = mongoose;

const recipeSchema = new Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    
    title: {
        type: String,
        required: true
    },
    
    score: {
        type: Number,
        required: false,
    },

    sourceName: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: false
    },

    readyInMinutes: {
        type: Number,
        required: true,
    },

    dishTypes: {
        type: [String],
        default: [],
    },
    cuisines: {
        type: [String],
        default: [],
    },
    occasions: {
        type:[String],
        default: [],
    },
    diets: {
        type: [String],
        default: [],
    },
    nutrition: {
        nutrients: [
            {
                name: {type: String, reqired: true},
                amount: {type: String, required: true},
                unit: {type: String, required: true},
            }
        ]
    },
    extendedIngredients: [
        {
          amount: { type: Number, required: true },
          unit: { type: String, required: true },
          name: { type: String, required: true },
        },
    ],
    analyzedInstructions: [
        {
          steps: [
            {
              number: { type: Number, required: true },
              step: { type: String, required: true },
            },
          ],
        },
    ],
},
    {timestamps: true}
)

// check if we have a models, if we dont, we create a new one
const Recipe = models.Recipe ||  mongoose.model("Recipe", recipeSchema)

// we export the object so that it can be used in other file
export default Recipe