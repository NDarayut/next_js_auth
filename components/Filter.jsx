import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Filter({ cuisines, dishTypes, query }) {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDishTypes, setSelectedDishTypes] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state
  const router = useRouter();

  const handleCuisineChange = (cuisine) => {
    setSelectedCuisines((prevSelected) =>
      prevSelected.includes(cuisine)
        ? prevSelected.filter((item) => item !== cuisine)
        : [...prevSelected, cuisine]
    );
  };

  const handleDishTypeChange = (dishType) => {
    setSelectedDishTypes((prevSelected) =>
      prevSelected.includes(dishType)
        ? prevSelected.filter((item) => item !== dishType)
        : [...prevSelected, dishType]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterParams = new URLSearchParams();
    filterParams.set("query", query);
    if (selectedCuisines.length > 0) {
      filterParams.set("cuisines", selectedCuisines.join(","));
    }
    if (selectedDishTypes.length > 0) {
      filterParams.set("dishTypes", selectedDishTypes.join(","));
    }
    router.push(`/search?${filterParams.toString()}`);
  };

  return (
    <div className="relative">
      {/* Dropdown Toggle */}
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-28 bg-customGreen text-white p-2 rounded-3xl hover:bg-customDarkGreen transition-colors duration-300"
      >
        {isDropdownOpen ? (
         <>
          <Image 
            src="/filter.png" // Ensure the correct path for your image
            alt="filter"
            width={20}
            height={20}
            className="inline-block mx-3"
          />
          <span>Filter</span>
        </>
         ) : (
        <>
          <Image 
            src="/filter.png" // Ensure the correct path for your image
            alt="filter"
            width={20}
            height={20}
            className="inline-block mx-3"
          />
          <span>Filter</span>
        </>
        )}
      </button>

      {isDropdownOpen && (
        <form
          onSubmit={handleSubmit}
          className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg p-4"
        >
          {/* Filter Options */}
          <div className="flex flex-wrap gap-4">
            {/* Cuisines */}
            <div className="flex flex-col">
              <div className="flex gap-2 flex-wrap">
                {cuisines.map((cuisine) => (
                  <label
                    key={cuisine._id}
                    className={`px-3 py-1 border rounded-lg cursor-pointer ${
                      selectedCuisines.includes(cuisine.name)
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={cuisine.name}
                      checked={selectedCuisines.includes(cuisine.name)}
                      onChange={() => handleCuisineChange(cuisine.name)}
                      className="hidden"
                    />
                    {cuisine.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Dish Types */}
            <div className="flex flex-col">
              <div className="flex gap-2 flex-wrap">
                {dishTypes.map((dishType) => (
                  <label
                    key={dishType._id}
                    className={`px-3 py-1 border rounded-lg cursor-pointer ${
                      selectedDishTypes.includes(dishType.name)
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={dishType.name}
                      checked={selectedDishTypes.includes(dishType.name)}
                      onChange={() => handleDishTypeChange(dishType.name)}
                      className="hidden"
                    />
                    {dishType.name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-28 bg-customGreen text-white p-2 mt-4 rounded-3xl hover:bg-customDarkGreen transition-colors duration-300"
            >
              Apply Filter
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
