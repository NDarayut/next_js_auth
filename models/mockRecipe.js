import mongoose from "mongoose";
const  {Schema, models} = mongoose;

const mockRecipeSchema = new Schema({
    
    // When create pending-delete, we only need recipe's ID and the status
    // So everything else is not required
    originalRecipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },

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
        required: false
    },
    
    score: {
        type: Number,
        required: false,
    },

    sourceName: {
        type: String,
        required: false
    },

    summary: {
        type: String,
        required: false
    },

    image: {
        type: String,
        required: false
    },

    readyInMinutes: {
        type: Number,
        required: false,
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
const MockRecipe = models.MockRecipe ||  mongoose.model("MockRecipe", mockRecipeSchema)

// we export the object so that it can be used in other file
export default MockRecipe