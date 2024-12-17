"use client"
import { useRecipes } from "@/app/hook/useRecipes"
import Image from "next/image"
import { useEffect } from "react"

export default function RecipeDetail({params}){
    
    const {id}  = params
    console.log(id) // debug to see if ID is defined
    const {recipeDetail, loading, error, fetchRecipeById} = useRecipes()
    
    useEffect(() =>{
        fetchRecipeById(id)
    }, [id])

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error: {error}</p>
    }

    if (!recipeDetail) {
        // Fallback in case recipeDetail is still null
        return <p>No recipe details available.</p>;
    }

    const title = recipeDetail.title
    const author = recipeDetail.sourceName
    const description = recipeDetail.summary
    const recipeImage = recipeDetail.image
    const prepTime = recipeDetail.readyInMinutes
    const calories = recipeDetail.nutrition?.nutrients?.find( (nutrient) => nutrient.name === "Calories")?.amount
    const numberOfIngredients = recipeDetail.nutrition?.ingredients?.length
    const ingredients = recipeDetail.extendedIngredients
    const instruction = recipeDetail.analyzedInstructions
    const tags = {
        dishTypes: recipeDetail.dishTypes || [],
        cuisines: recipeDetail.cuisines || [],
        occasions: recipeDetail.occasions || [],
    }

    return(
        <div>
           <h1>{title}</h1>
           <h1>Created by: {author}</h1>
           <section>
            <p dangerouslySetInnerHTML={{__html:description}} />
           </section>
           
           <img 
            src={recipeImage}
            className="w-[400px] h-full object-cover"/>
            <div className="flex flex-row">
                <p>Prep time: {prepTime}</p>
                <p>Ingredients: {numberOfIngredients}</p>
                <p>Calories: {calories}</p>
            </div>
            
            <div>
                <h1>Ingredients</h1>
                <ul className="list-disc pl-5">
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.amount} {ingredient.unit} of {ingredient.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h1>Instructions</h1>
                {instruction.map((instruction, index) => (
                    <div key={index}>
                    {instruction.name && <h3>{instruction.name}</h3>}
                    <ol>
                        {instruction.steps.map((step) => (
                        <li key={step.number}>
                            <span className="font-bold">Step {step.number}:</span> {" "}
                            <span dangerouslySetInnerHTML={{ __html: step.step }}/>
                        </li>
                        ))}
                    </ol>
                    </div>
                ))}
                
            </div>
            
            <div>
                <h2 className="text-xl font-bold mb-4">Recipe Tags</h2>
                <div className="flex flex-wrap gap-2">
                    {tags.dishTypes.map((tag, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 bg-customGreen text-white text-sm font-semibold rounded-full"
                    >
                        {tag}
                    </span>
                    ))}

                    {tags.cuisines.map((tag, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 bg-customGreen text-white text-sm font-semibold rounded-full"
                    >
                        {tag}
                    </span>
                    ))}

                    {tags.occasions.map((tag, index) => (
                    <span
                        key={index}
                        className="px-4 py-2 bg-customGreen text-white text-sm font-semibold rounded-full"
                    >
                        {tag}
                    </span>
                    ))}
                    
                </div>
            </div>
           
        </div>
    )
}