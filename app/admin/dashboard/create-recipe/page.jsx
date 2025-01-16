"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import FormInputs from "./components/FormInput";
import CheckboxGroup from "./components/CheckboxGroup";
import Instructions from "./components/InstructionForm";
import NutritionForm from './components/NutritionForm';
import IngredientForm from "./components/IngredientForm";
import { useRouter } from 'next/navigation'; // For client-side redirects
import Image from "next/image";
import SideBar from "../components/SideBar";

export default function CreateRecipe() {
  const { data: session, status } = useSession();
  const router = useRouter();
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

  // For storing cuisines and dishtypes fetched from the API
  const [cuisinesList, setCuisinesList] = useState([]);
  const [dishtypesList, setDishtypesList] = useState([]);

  // Fetch the cuisines and dishtypes from the API to display for user.
  // Automatically input the creator name based on their session
  useEffect(() => {
    // // Get the username from the session, and updates the form data
    if (status === "authenticated") {
      setFormData((prev) => ({
        ...prev,
        sourceName: session.user.username, // Setting the name of recipe's creator
      }));
   }

    // Fetch cuisines and dishtypes from the API, so we can use to create checkboxes
    const fetchData = async () => {
      try {
        const cuisinesResposne = await fetch('/api/categories/cuisines');
        const dishtypesResponse = await fetch('/api/categories/dishtypes')
        const dataCuisines = await cuisinesResposne.json();
        const dataDishtypes = await dishtypesResponse.json();
        setCuisinesList(dataCuisines);
        setDishtypesList(dataDishtypes);
        
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

  }, [session]);

  // Extract the "name" and "value" prooperties, and apply changes. 
  // Name includes: title, summary..etc
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNutritionChange = (index, field, value) => {
    /*
      --index: Specific nutrition in the nutrition array
      --field: Key that needs to be changed (Nutrition name, Amount, and Unit )
      --value: The new value that we input
    */
    const updatedNutritions = [...nutritions]; // creates a copy of the array (even if it's empty)
    updatedNutritions[index][field] = value; // access the array at specific index to update its value
    setNutritions(updatedNutritions); // Set the new value
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value; // index is the row, and field is the name, amount or unit
    setIngredients(updatedIngredients);
  };

  const addIngredientRow = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const removeIngredientRow = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value; // Instruction is a 1 Dimensional array with no columns
    setInstructions(updatedInstructions);
  };

  const addInstructionStep = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstructionStep = (index) => {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(updatedInstructions);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Single file upload (Get the first and only file)
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // IF user submit an image, convert it to base64 string and store it on the database
    let base64Image = "";
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        base64Image = reader.result;
        const payload = {
          ...formData,
          status: "approved", // Admin created recipes no need admin approval
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
          userId: session.user.id,
        };

        try {
          const response = await fetch("/api/recipes/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if(!response.ok){
            const { error } = await response.json();
            setResponse(error || "Failed to create recipe");
            return;
          }

          setIsSuccess(true);
        } 
        catch (error) {
          console.error(error);
          setResponse({ error: "Failed to create recipe" });
        }
      };

      reader.readAsDataURL(imageFile); // convert the image file into a base64 string
    } 
    
    else {
      alert("Please upload an image.");
    }
  };

  // Reset the pop-up message after 5 second
  useEffect(() => {
    if (response || isSuccess) {
      const timer = setTimeout(() => {
        setResponse(null);
        setIsSuccess(false); // Reset the success message
      }, 5000); // Clear after 5 seconds
  
      return () => clearTimeout(timer); // Cleanup on unmount or state change
    }
  }, [response, isSuccess]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Check if the user is not authenticated
  if (status === "unauthenticated") {
    router.push("/login"); // Redirect to home or login page if not authenticated or not admin
    return null;
  }
    
  return (
    <div className="flex min-h-screen">

      <SideBar />

      {/*The rest of the components*/}
      <main className="flex-1 p-8 bg-customYellow">

      
      <div className="font-sans mx-[100px] mb-28">

        <form onSubmit={handleSubmit} className="space-y-4">

          {/*Title, Author, Image, Description, and Prep time */} 
          <FormInputs formData={formData} handleChange={handleChange} handleImageUpload={handleImageUpload}/>

          {/* Dishtypes */}
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
            }}
          />

          {/* Cuisines */}
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
            }}
          />

          {/* Ingredient table*/}
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
                <IngredientForm
                  key={index}
                  index={index}
                  ingredient={ingredient}
                  handleChange={handleIngredientChange}
                  removeIngredient={removeIngredientRow}
                />
              ))}

              <tr className="border-t border-black">
                <td>
                  <button
                    type="button"
                    onClick={addIngredientRow}
                    className="flex justify-center"
                  >
                    <Image 
                      src="/add.png"
                      alt="Add ingredients"
                      width={24}
                      height={24}
                      className="m-3"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          

          {/* Nutrition Table */}
          <NutritionForm
            nutritions={nutritions}
            handleNutritionChange={handleNutritionChange}
          />

          {/* Instructions table */}
          <Instructions
            instructions={instructions}
            handleChange={handleInstructionChange}
            addStep={addInstructionStep}
            removeStep={removeInstructionStep}
          />
          <div className="w-full flex justify-center">
            <button type="submit" className=" text-white text-lg rounded-md px-4 py-2 bg-customGreen font-jura hover:bg-[#4E8A5A] active:bg-[#335C3D]">
              Create Recipe
            </button>
          </div>
        </form>
        {isSuccess && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-customGreen text-white px-4 py-2 rounded-md shadow-lg z-50">
            Recipe created successfully
          </div>
        )}

        {/* Error message */}
        {response && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
            {response}
          </div>
        )}
      </div>
      </main>
    </div>
  );
}
