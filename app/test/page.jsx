"use client"
import { useState } from "react";

export default function TestRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    sourceName: "",
    summary: "",
    readyInMinutes: "",
    dishTypes: "",
    cuisines: "",
    occasions: "",
    diets: "",
  });

  const [imageFile, setImageFile] = useState(null); // Store the uploaded image file
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = "";
    if (imageFile) {
      // Convert the uploaded image to Base64
      const reader = new FileReader();
      reader.onload = async () => {
        base64Image = reader.result;

        const payload = {
          ...formData,
          image: base64Image, // Add the Base64 string of the image
          dishTypes: formData.dishTypes.split(","),
          cuisines: formData.cuisines.split(","),
          occasions: formData.occasions.split(","),
          diets: formData.diets.split(","),
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
      
      reader.readAsDataURL(imageFile); // Convert image to Base64
    } else {
      alert("Please upload an image.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Recipe Creation</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Recipe Title"
          className="border p-2 w-full"
        />
        <input
          name="sourceName"
          value={formData.sourceName}
          onChange={handleChange}
          placeholder="Source Name"
          className="border p-2 w-full"
        />
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Summary"
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 w-full"
        />
        <input
          name="readyInMinutes"
          value={formData.readyInMinutes}
          onChange={handleChange}
          placeholder="Ready in Minutes"
          className="border p-2 w-full"
        />
        <input
          name="dishTypes"
          value={formData.dishTypes}
          onChange={handleChange}
          placeholder="Dish Types (comma-separated)"
          className="border p-2 w-full"
        />
        <input
          name="cuisines"
          value={formData.cuisines}
          onChange={handleChange}
          placeholder="Cuisines (comma-separated)"
          className="border p-2 w-full"
        />
        <input
          name="occasions"
          value={formData.occasions}
          onChange={handleChange}
          placeholder="Occasions (comma-separated)"
          className="border p-2 w-full"
        />
        <input
          name="diets"
          value={formData.diets}
          onChange={handleChange}
          placeholder="Diets (comma-separated)"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {response && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Response:</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

