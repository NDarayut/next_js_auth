"use client";

import Navbar from "@/components/Navbar";

export default function CreateRecipe() {
  
  return (
    <>
    <div className="mb-36">
      <Navbar />
    </div>
  
  <div className="flex justify-center items-center px-4">
    <div className="p-8 rounded-lg max-w-full md:max-w-[1300px] w-full">
      {/* Form */}
      <form className="space-y-6">
        {/* Recipe Name */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <label className="text-lg font-medium text-gray-700">
            Recipe title
          </label>
          <div className="md:col-span-2">
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Recipe title"
              required
            />
                 
          </div>
        </div>
        
        {/* Upload Image */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <label className="text-lg font-medium text-gray-700">
            Upload image
          </label>
          <div className="md:col-span-2">
            <input
              type="file"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-customGreen"
            />
          </div>
        </div>
        {/* Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
          <label className="text-lg font-medium text-gray-700">
            Description
          </label>
          <div className="md:col-span-2">
            <textarea
              rows={6}
              placeholder="Write your recipe description here..."
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen text-gray-600"
              defaultValue={""}
            />
          </div>
        </div>
      </form>
    </div>
  </div>
  
  <div className="flex justify-center items-center">
    <div className="p-6 rounded-lg max-w-[1300px] w-full">
      {/* Ingredients Title */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ingredients</h2>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-black text-gray-700">
          {/* Table Head */}
          <thead>
            <tr className="border-b border-black">
              <th className="py-3 px-4 text-left font-medium">Serving name</th>
              <th className="py-3 px-4 text-left font-medium">Amount</th>
              <th className="py-3 px-4 text-left font-medium">Unit</th>
              <th className="py-3 px-4 text-left font-medium">Weight</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            <tr className="border-b border-black">
              <td className="py-3 px-4">Mozzarella cheese</td>
              <td className="py-3 px-4">2</td>
              <td className="py-3 px-4">cup</td>
              <td className="py-3 px-4">61.3g</td>
            </tr>
            <tr className="border-b border-black">
              <td className="py-3 px-4">Pizza sauce</td>
              <td className="py-3 px-4">1/4</td>
              <td className="py-3 px-4">cup</td>
              <td className="py-3 px-4">14.3g</td>
            </tr>
            {/* Add More Row */}
            <tr>
              <td colSpan={4} className="py-4 px-10 text-center">
                <button className="w-8 h-8 rounded-full border-2 border-black text-gray-600 hover:bg-gray-200 flex items-center justify-center">
                  <span className="text-xl">+</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div className="mx-auto p-4" style={{ maxWidth: 1300 }}>
    <h2 className="text-xl font-semibold mb-4">Nutritions</h2>
    <table className="min-w-full border border-black">
      <thead>
        <tr className=" text-left">
          <th className="py-2 px-4 border-b border-black">Nutrition</th>
          <th className="py-2 px-4 border-b border-black">Amount</th>
          <th className="py-2 px-4 border-b border-black" />
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-black">
          <td className="py-2 px-4">Calories</td>
          <td className="py-2 px-4">61.3g</td>
          <td className="py-2 px-4 text-right">
            <button className="text-red-500 hover:text-red-700">
              <i className="fa-solid fa-trash-can" />
            </button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="py-2 px-4">Total fat</td>
          <td className="py-2 px-4">6.3g</td>
          <td className="py-2 px-4 text-right">
            <button className="text-red-500 hover:text-red-700">
              <i className="fa-solid fa-trash-can" />
            </button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="py-2 px-4">Saturated fat</td>
          <td className="py-2 px-4" />
          <td className="py-2 px-4 text-right">
            <button className="text-red-500 hover:text-red-700">
              <i className="fa-solid fa-trash-can" />
            </button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="py-2 px-4">Cholesterol</td>
          <td className="py-2 px-4" />
          <td className="py-2 px-4 text-right">
            <button className="text-red-500 hover:text-red-700">
              <i className="fa-solid fa-trash-can" />
            </button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="py-2 px-4">Sodium</td>
          <td className="py-2 px-4" />
          <td className="py-2 px-4 text-right">
            <button className="text-red-500 hover:text-red-700">
              <i className="fa-solid fa-trash-can" />
            </button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="py-2 px-4">Potassium</td>
          <td className="py-2 px-4" />
          <td className="py-2 px-4 text-right">
            <button className="text-red-500 hover:text-red-700">
              <i className="fa-solid fa-trash-can" />
            </button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="py-2 px-4">Total carbohydrate</td>
          <td className="py-2 px-4" />
          <td className="py-2 px-4 text-right">
            <button className="text-red-500 hover:text-red-700">
              <i className="fa-solid fa-trash-can" />
            </button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="py-2 px-4">Sugars</td>
          <td className="py-2 px-4" />
          <td className="py-2 px-4 text-right">
            <button className="text-red-500 hover:text-red-700">
              <i className="fa-solid fa-trash-can" />
            </button>
          </td>
        </tr>
        <tr className="border-b border-black">
          <td className="py-2 px-4">Protein</td>
          <td className="py-2 px-4" />
          <td className="py-2 px-4 text-right">
            <button className="text-red-500 hover:text-red-700">
              <i className="fa-solid fa-trash-can" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="max-w-[1300px] mx-auto p-6 rounded-lg bg-beige">
    <h2 className="text-xl font-semibold mb-4">Recipe tags</h2>
    {/* Table wrapper with scroll on small screens */}
    <div className="overflow-x-auto">
      <table className="min-w-full border border-black">
        <tbody>
          <tr className="border-b border-black">
            <td className="py-2 px-4">Main dishes</td>
            <td className="py-2 px-4 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="py-2 px-4">Vegetable</td>
            <td className="py-2 px-4 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="py-2 px-4">Soup</td>
            <td className="py-2 px-4 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="py-2 px-4">Dessert</td>
            <td className="py-2 px-4 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="py-2 px-4">Bread</td>
            <td className="py-2 px-4 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
            </td>
          </tr>
          <tr className="border-b border-black">
            <td className="py-2 px-4">Salad</td>
            <td className="py-2 px-4 text-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    {/* Tags Section */}
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center w-full md:w-auto">
        Main dish
        <span
          className="ml-2 cursor-pointer"
          onclick="handleCancel('Main dish')"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx={12} cy={12} r={10} stroke="white" strokeWidth={2} />
            <path stroke="white" strokeWidth={2} d="M15 9l-6 6m0-6l6 6" />
          </svg>
        </span>
      </button>
      <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center w-full md:w-auto">
        Asian
        <span className="ml-2 cursor-pointer" onclick="handleCancel('Asian')">
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx={12} cy={12} r={10} stroke="white" strokeWidth={2} />
            <path stroke="white" strokeWidth={2} d="M15 9l-6 6m0-6l6 6" />
          </svg>
        </span>
      </button>
      <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center w-full md:w-auto">
        Dairy
        <span className="ml-2 cursor-pointer" onclick="handleCancel('Dairy')">
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx={12} cy={12} r={10} stroke="white" strokeWidth={2} />
            <path stroke="white" strokeWidth={2} d="M15 9l-6 6m0-6l6 6" />
          </svg>
        </span>
      </button>
    </div>
  </div>
  <div className="p-6 max-w-screen-lg mx-auto" style={{ maxWidth: 1300 }}>
    <label
      className="block text-black text-2xl font-semibold mb-2"
      htmlFor="estimated-time"
    >
      Estimated time
    </label>
    <div className="border border-black rounded-md w-full h-16 flex items-center p-2"></div>
  </div>
  <div className="p-6 max-w-screen-lg mx-auto" style={{ maxWidth: 1300 }}>
    <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
    {/* Instructions Section */}
    <div className="space-y-4">
      {/* First Instruction */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <button className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full text-lg font-bold text-black">
          1
        </button>
        <div className="border border-black rounded-md p-4 flex-grow">
          <p className="text-gray-700">
            Heat the oven to 550°F or higher. Arrange a rack in the lower-middle
            part of the oven (if you have a baking stone, place it on the rack)
            and heat the oven to 550°F or higher.
          </p>
        </div>
      </div>
      {/* Add more instructions */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <button className="bg-gray-300 text-black w-10 h-10 rounded-full flex items-center justify-center">
          +
        </button>
        <input
          type="text"
          placeholder="Add more instructions..."
          className="border border-black rounded-md w-full h-12 p-2 focus:outline-none focus:border-green-600 transition"
        />
      </div>
    </div>
    {/* Save and Upload Buttons */}
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-6 items-center justify-center">
      <button className="bg-green-600 text-white px-6 py-2 rounded w-full md:w-auto">
        Save draft
      </button>
      <button className="bg-green-600 text-white px-6 py-2 rounded w-full md:w-auto">
        Upload
      </button>
    </div>
  </div>
  <div className="footer bg-[#f5e0d3] p-8 text-center">
    {/* Flex Container */}
    <div className="flex flex-col md:flex-row justify-around p-10 space-y-8 md:space-y-0">
      {/* Left Side - Title */}
      <div className="text-center md:text-left">
        <h1
          className="text-5xl font-bold mb-2"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          My KITCHEN
        </h1>
        <h2
          className="text-5xl font-semibold mb-4"
          style={{ fontFamily: '"Comic Sans MS", cursive' }}
        >
          My - RULES
        </h2>
      </div>
      {/* Right Side - Contact Form */}
      <div className="text-center md:text-left">
        <p className="text-lg mb-4 text-center">
          Email us for more information
        </p>
        <div className="flex items-center bg-[#f5f5f5] border border-gray-300 rounded-md p-2 w-full md:w-[500px] mx-auto">
          <span className="text mr-2">
            <i className="fa-brands fa-google" />
          </span>
          <input
            type="email"
            placeholder="Email us..."
            className="flex-1 bg-transparent border-none focus:outline-none placeholder-gray-400 py-2 px-4"
          />
          <button className="bg-[#f5e0d3] text-gray-700 rounded-md px-4 py-2 ml-2">
            Send
          </button>
        </div>
      </div>
    </div>
    {/* Footer Quotes */}
    <div className="p-10 text-center">
      <p className="text-lg mb-6">
        Try new recipes, learn from your mistakes, be fearless, and above all,{" "}
        <span className="font-bold">HAVE FUN!</span>
      </p>
      <p className="text-lg mb-4">
        I don&apos;t think there are bad cooks, just bad recipes.
      </p>
    </div>
  </div>
</>

  );
}
