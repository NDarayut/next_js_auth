"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import CheckboxGroup from "./components/CheckboxGroup";
import Instructions from "./components/InstructionForm";
import NutritionForm from "./components/NutritionForm";
import IngredientForm from "./components/IngredientForm";
import { useRouter, useParams } from 'next/navigation'; // For client-side redirects
import { useRecipes } from "@/app/hook/useRecipes";
import Image from "next/image";
import FormInputs from "./components/FormInput";
import SideBar from "@/app/admin/dashboard/components/SideBar";

export default function UpdateRecipe() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams(); // Assuming the recipe ID is passed in the URL as a parameter
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    sourceName: "",
    summary: "",
    readyInMinutes: "",
    dishTypes: [],
    cuisines: [],
  });
  const [ingredients, setIngredients] = useState([{ name: "", amount: "", unit: "" }]);
  const [nutritions, setNutritions] = useState([
    { name: "Calories", amount: "", unit: "kcal" },
    { name: "Fat", amount: "", unit: "g" },
    { name: "Saturated Fat", amount: "", unit: "g" },
    { name: "Carbohydrates", amount: "", unit: "g" },
    { name: "Sugar", amount: "", unit: "g" },
    { name: "Cholesterol", amount: "", unit: "mg" },
    { name: "Sodium", amount: "", unit: "mg" },
    { name: "Protein", amount: "", unit: "g" },
    { name: "Potassium", amount: "", unit: "mg" },
  ]);
  const [instructions, setInstructions] = useState([""]);
  const [imageFile, setImageFile] = useState(null);
  const [response, setResponse] = useState(null);
  const {recipeDetail, loading, error, fetchRecipeById} = useRecipes()

  // For storing cuisines and dishtypes fetched from the API
  const [cuisinesList, setCuisinesList] = useState([]);
  const [dishtypesList, setDishtypesList] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect if the user is not authenticated
    }
  }, [status]);

  useEffect(() => {
    // Fetch cuisines and dishtypes from the API
    const fetchCategories = async () => {
      try {
        const cuisinesResposne = await fetch('/api/categories/cuisines');
        const dishtypesResponse = await fetch('/api/categories/dishtypes')
        const dataCuisines = await cuisinesResposne.json();
        const dataDishtypes = await dishtypesResponse.json();
        setCuisinesList(dataCuisines);
        setDishtypesList(dataDishtypes);
        
      } 
      
      catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchCategories()
    fetchRecipeById(id);
  }, [id]); // Fetch recipe when the ID changes

  useEffect(() => {
    if (recipeDetail) {
      setFormData({
        title: recipeDetail.title,
        image: recipeDetail.image || "", 
        sourceName: recipeDetail.sourceName,
        summary: recipeDetail.summary,
        readyInMinutes: recipeDetail.readyInMinutes,
        dishTypes: recipeDetail.dishTypes || [],
        cuisines: recipeDetail.cuisines || [],
      });
      setIngredients(recipeDetail.extendedIngredients || []);
      setNutritions(recipeDetail?.nutrition || []);
      setInstructions(
        recipeDetail.analyzedInstructions?.[0]?.steps.map((step) => step.step) || []
      );
    }
  }, [recipeDetail]); // Update form data when recipeDetail changes


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleNutritionChange = (index, field, value) => {
    const updatedNutritions = [...nutritions];
    updatedNutritions[index][field] = value;
    setNutritions(updatedNutritions);
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  const addIngredientRow = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const removeIngredientRow = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const addInstructionStep = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstructionStep = (index) => {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(updatedInstructions);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = formData.image;
    // If user upload image run this code
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        base64Image = reader.result;
        const payload = {
          ...formData,
          status: "approved",
          userId: recipeDetail.userId,
          score: recipeDetail.score,
          image: base64Image,
          extendedIngredients: ingredients,
          nutrition: { nutrients: nutritions },
          analyzedInstructions: [
            {
              steps: instructions.map((instruction, index) => ({
                number: index + 1,
                step: instruction,
              })),
            },
          ],
        };

        // update the recipe
        try {
          const response = await fetch(`/api/recipes/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const { error } = await response.json();
            setResponse(error || "Failed to update recipe");
            return;
          }

          setIsSuccess(true);
        } 
        
        catch (error) {
          console.error(error);
          setResponse("Failed to update recipe");
        }
      };

      reader.readAsDataURL(imageFile);
    } 
    
    // if user doesnt upload any image, use the one from the database
    else {
      const payload = {
        ...formData,
        status: "approved",
        userId: recipeDetail.userId,
        score: recipeDetail.score,
        image: base64Image,
        extendedIngredients: ingredients,
        nutrition: { nutrients: nutritions },
        analyzedInstructions: [
          {
            steps: instructions.map((instruction, index) => ({
              number: index + 1,
              step: instruction,
            })),
          },
        ],
      };

      try {
        const response = await fetch(`/api/recipes/update/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const { error } = await response.json();
          setResponse(error || "Failed to update recipe");
          return;
        }

        setIsSuccess(true);
      } 
      
      catch (error) {
        console.error(error);
        setResponse("Failed to update recipe");
      }
    }
  };

if(error){
    return <p>Error: {error}</p>
}

if (!recipeDetail) {
    // Fallback in case recipeDetail is still null
    return <p>No recipe details available.</p>;
}

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
        <SideBar />
        <main className="flex-1 p-8">
            <div className="font-sans mx-[100px] mb-28">
                <form onSubmit={handleSubmit} className="space-y-4">
                <FormInputs formData={formData} handleChange={handleChange} handleImageUpload={handleImageUpload} />
                
                <CheckboxGroup 
                  label="Dish Types" 
                  options={dishtypesList.map((dishtype) => dishtype.name)} 
                  selectedOptions={formData.dishTypes} 
                  handleChange={(option) => { 
                    const checked = formData.dishTypes.includes(option);
                    setFormData({
                      ...formData,
                      dishTypes: checked
                        ? formData.dishTypes.filter((item) => item !== option)
                        : [...formData.dishTypes, option],
                    });
                }}/>

                <CheckboxGroup 
                  label="Cuisines" 
                  options={cuisinesList.map((cuisine) => cuisine.name)} 
                  selectedOptions={formData.cuisines} 
                  handleChange={(option) => { 
                    const checked = formData.cuisines.includes(option);
                    setFormData({
                      ...formData,
                      cuisines: checked
                        ? formData.cuisines.filter((item) => item !== option)
                        : [...formData.cuisines, option],
                    });
                 }}/>
                
                <h2 className="text-2xl font-semibold mb-4 text-customDarkGreen">Ingredients</h2>
                <table className="w-full border border-customDarkGreen text-customDarkGreen">
                    <thead>
                    <tr className="border-b border-customDarkGreen">
                        <th className="py-3 px-4 text-left font-medium">Ingredient Name</th>
                        <th className="py-3 px-4 text-left font-medium">Amount</th>
                        <th className="py-3 px-4 text-left font-medium">Unit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ingredients.map((ingredient, index) => (
                        <IngredientForm key={index} index={index} ingredient={ingredient} handleChange={handleIngredientChange} removeIngredient={removeIngredientRow} />
                    ))}
                    <tr className="border-t border-black">
                        <td>
                        <button type="button" onClick={addIngredientRow} className="flex justify-center">
                            <Image 
                            src="/add.png"
                            alt="Add Ingredient"
                            width={24}
                            height={24}
                            className="m-3"
                            />
                        </button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <NutritionForm nutritions={nutritions} handleNutritionChange={handleNutritionChange} />
                <Instructions instructions={instructions} handleChange={handleInstructionChange} addStep={addInstructionStep} removeStep={removeInstructionStep} />

                <div className="w-full flex justify-center gap-10">
                    <button type="submit" className="text-white text-lg rounded-md px-4 py-2 bg-customGreen font-jura hover:bg-[#4E8A5A] active:bg-[#335C3D]">Update Recipe</button>
                </div>
                </form>
                {isSuccess && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-customGreen text-white px-4 py-2 rounded-md shadow-lg z-50">
                    Update Successfully
                </div>
                )}
            </div>
        </main>
    </div>
  );
}
