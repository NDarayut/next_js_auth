import mongoose from "mongoose";
const  {Schema, models} = mongoose;

const recipeSchema = new Schema({
    status: {
        type:String,
        required: true
    },
    
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: false 
    },
    
    title: {
        type: String,
        required: true
    },
    
    score: {
        type: Number,
    },

    averageRating: {
        type: Number,
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
        required: true
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
                name: {type: String, reqired: false},
                amount: {type: String, required: false},
                unit: {type: String, required: false},
            }
        ]
    },

    extendedIngredients: [
        {
          amount: { type: Number, required: false },
          unit: { type: String, required: false },
          name: { type: String, required: false },
        },
    ],
    
    analyzedInstructions: [
        {
          steps: [
            {
              number: { type: Number, required: false },
              step: { type: String, required: false },
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