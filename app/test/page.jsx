// app/test-recipe/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import FormInputs from "./components/FormInput";
import CheckboxGroup from "./components/CheckboxGroup";
import IngredientRow from "./components/IngredientForm";
import Instructions from "./components/InstructionForm";
import NutritionForm from './components/NutritionForm';
import Navbar from "@/components/Navbar";

export default function TestRecipe() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    sourceName: "",
    summary: "",
    readyInMinutes: "",
    dishTypes: [],
    cuisines: [],
    occasions: [],
    diets: [],
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

  useEffect(() => {
    if (session && session.user) {
      setFormData((prev) => ({
        ...prev,
        sourceName: session.user.username,
      }));
    }
  }, [session]);

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

  const addIngredientRow = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);
  };

  const removeIngredientRow = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
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
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = "";
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        base64Image = reader.result;
        const payload = {
          ...formData,
          sourceName: session.user.username,
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
          const res = await fetch("/api/recipes/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = await res.json();
          setResponse(data);
        } catch (error) {
          console.error(error);
          setResponse({ error: "Failed to create recipe" });
        }
      };

      reader.readAsDataURL(imageFile);
    } else {
      alert("Please upload an image.");
    }
  };

  return (
    <div className="bg-customYellow min-h-screen">

      {/*Nav bar */}
      <div className="sticky top-0 bg-customYellow z-50 mb-28">
        <Navbar />
      </div>

      {/*The rest of the components */}
      <div className="font-sans mx-[100px]">

        <form onSubmit={handleSubmit} className="space-y-4">

          {/*Title, Author, Image, Description, and Prep time */}
          
            
          <FormInputs formData={formData} handleChange={handleChange} handleImageUpload={handleImageUpload}/>

          

          <CheckboxGroup
            label="Dish Types"
            options={["Appetizer", "Main Course", "Dessert"]}
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

          <CheckboxGroup
            label="Cuisines"
            options={["Italian", "Asian", "American"]}
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

          <CheckboxGroup
            label="Occasions"
            options={["Party", "Wedding", "Funeral"]}
            selectedOptions={formData.occasions}
            handleChange={(option) => {
              const checked = formData.occasions.includes(option);
              setFormData({
                ...formData,
                occasions: checked
                  ? formData.occasions.filter((item) => item !== option)
                  : [...formData.occasions, option],
              });
            }}
          />

          <CheckboxGroup
            label="Diets"
            options={["Vegan", "Gluten-free", "Keto"]}
            selectedOptions={formData.diets}
            handleChange={(option) => {
              const checked = formData.diets.includes(option);
              setFormData({
                ...formData,
                diets: checked
                  ? formData.diets.filter((item) => item !== option)
                  : [...formData.diets, option],
              });
            }}
          />

          {/* Repeat CheckboxGroup for Cuisines, Occasions, and Diets */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ingredients</h2>
          <table className="w-full border border-black text-gray-700">
            <thead>
              <tr className="border-b border-black">
                <th className="py-3 px-4 text-left font-medium">Ingredient Name</th>
                <th className="py-3 px-4 text-left font-medium">Amount</th>
                <th className="py-3 px-4 text-left font-medium">Unit</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <IngredientRow
                  key={index}
                  index={index}
                  ingredient={ingredient}
                  handleChange={handleIngredientChange}
                  removeIngredient={removeIngredientRow}
                />
              ))}
            </tbody>
          </table>

          <button
            type="button"
            onClick={addIngredientRow}
            className="bg-blue-500 text-white p-2"
          >
            Add Ingredient
          </button>

          {/* Nutrition Table */}
          <NutritionForm
            nutritions={nutritions}
            handleNutritionChange={handleNutritionChange}
          />
          
          <Instructions
            instructions={instructions}
            handleChange={handleInstructionChange}
            addStep={addInstructionStep}
            removeStep={removeInstructionStep}
          />
          <button type="submit" className="bg-green-500 text-white p-4 w-full mt-4">
            Submit Recipe
          </button>
        </form>
        {response && (
          <div className="mt-4">
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
      
    </div>
  );
}
