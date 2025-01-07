import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Filter({ cuisines, dishTypes, query }) {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDishTypes, setSelectedDishTypes] = useState([]);
  const router = useRouter();

  // Handle cuisine checkbox change
  const handleCuisineChange = (cuisine) => {
    setSelectedCuisines((prevSelected) => {
      if (prevSelected.includes(cuisine)) {
        return prevSelected.filter((item) => item !== cuisine); // Deselect
      } else {
        return [...prevSelected, cuisine]; // Select
      }
    });
  };

  // Handle dish type checkbox change
  const handleDishTypeChange = (dishType) => {
    setSelectedDishTypes((prevSelected) => {
      if (prevSelected.includes(dishType)) {
        return prevSelected.filter((item) => item !== dishType); // Deselect
      } else {
        return [...prevSelected, dishType]; // Select
      }
    });
  };

  // Submit the form and update the query string
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the query parameters
    const filterParams = new URLSearchParams();
    filterParams.set("query", query); // Include the search term (e.g., "burger")

    // Append cuisines and dish types if selected
    if (selectedCuisines.length > 0) {
      filterParams.set("cuisines", selectedCuisines.join(","));
    }
    if (selectedDishTypes.length > 0) {
      filterParams.set("dishTypes", selectedDishTypes.join(","));
    }

    // Redirect to the search page with updated query string
    router.push(`/search?${filterParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Cuisine filter with checkboxes */}
      <div>
        <label htmlFor="cuisine" className="block text-gray-700">
          Cuisine
        </label>
        <div className="space-y-2 mt-2">
          {cuisines.map((cuisine) => (
            <label
              key={cuisine._id}
              className={`inline-block px-4 py-2 border rounded-md cursor-pointer ${
                selectedCuisines.includes(cuisine.name) ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <input
                type="checkbox"
                value={cuisine.name}
                checked={selectedCuisines.includes(cuisine.name)}
                onChange={() => handleCuisineChange(cuisine.name)}
                className="mr-2"
              />
              {cuisine.name}
            </label>
          ))}
        </div>
      </div>

      {/* Dish Type filter with checkboxes */}
      <div>
        <label htmlFor="dishType" className="block text-gray-700">
          Dish Type
        </label>
        <div className="space-y-2 mt-2">
          {dishTypes.map((dishType) => (
            <label
              key={dishType._id}
              className={`inline-block px-4 py-2 border rounded-md cursor-pointer ${
                selectedDishTypes.includes(dishType.name) ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <input
                type="checkbox"
                value={dishType.name}
                checked={selectedDishTypes.includes(dishType.name)}
                onChange={() => handleDishTypeChange(dishType.name)}
                className="mr-2"
              />
              {dishType.name}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-customGreen text-white p-2 mt-4 rounded-md hover:bg-customDarkGreen transition-colors duration-300"
      >
        Apply Filter
      </button>
    </form>
  );
}
