import { useState } from "react";

export default function Categories({cuisines, dishTypes, handleAdd, handleEdit, handleDelete}) {
  const [cuisineInput, setCuisineInput] = useState("");
  const [dishTypeInput, setDishTypeInput] = useState("");
  const [editMode, setEditMode] = useState({ type: null, id: null });
  const [editInput, setEditInput] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h1 className="text-3xl font-bold text-customDarkGreen mb-6">Categories</h1>
      <div className="space-y-8">
        {/* Cuisines Table */}
        <div>
          <h2 className="text-2xl font-semibold text-customDarkGreen mb-4">
            Cuisines
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
                <th className="border-b-2 border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cuisines.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-gray-500">
                    No cuisines available
                  </td>
                </tr>
              ) : (
                cuisines.map((cuisine) => (
                  <tr key={cuisine._id} className="hover:bg-gray-100">
                    <td className="border-b px-4 py-2">
                      {editMode.type === "cuisine" && editMode.id === cuisine._id ? (
                        <input
                          type="text"
                          value={editInput}
                          onChange={(e) => setEditInput(e.target.value)}
                          className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                        />
                      ) : (
                        cuisine.name
                      )}
                    </td>
                    <td className="border-b px-4 py-2">
                      {editMode.type === "cuisine" && editMode.id === cuisine._id ? (
                        <>
                          <button
                            onClick={() => {
                              handleEdit("cuisine", cuisine._id, editInput);
                              setEditMode({ type: null, id: null });
                              setEditInput("");
                            }}
                            className="text-white px-3 py-1 bg-green-600 rounded-md shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditMode({ type: null, id: null });
                              setEditInput("");
                            }}
                            className="text-white px-3 py-1 bg-gray-600 rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditMode({ type: "cuisine", id: cuisine._id });
                              setEditInput(cuisine.name);
                            }}
                            className="text-white px-3 py-1 mr-2 rounded-md bg-customGreen hover:bg-[#4E8A5A] active:bg-[#335C3D] transition duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete("cuisine", cuisine._id)}
                            className="text-white px-3 py-1 bg-red-600 rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              placeholder="Add new cuisine"
              className="border border-gray-300 rounded-lg px-4 py-2 mr-4 w-1/2"
              value={cuisineInput}
              onChange={(e) => setCuisineInput(e.target.value)}
            />
            <button
              onClick={() => {
                handleAdd("cuisine", cuisineInput);
                setCuisineInput("");
              }}
              className="text-white px-3 py-1 mr-2 rounded-md bg-customGreen hover:bg-[#4E8A5A] active:bg-[#335C3D] transition duration-200"
            >
              Add Cuisine
            </button>
          </div>
        </div>

        {/* Dish Types Table */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dish Types</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 px-4 py-2">Name</th>
                <th className="border-b-2 border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dishTypes.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-gray-500">
                    No dish types available
                  </td>
                </tr>
              ) : (
                dishTypes.map((dishType) => (
                  <tr key={dishType._id} className="hover:bg-gray-100">
                    <td className="border-b px-4 py-2">
                      {editMode.type === "dishType" && editMode.id === dishType._id ? (
                        <input
                          type="text"
                          value={editInput}
                          onChange={(e) => setEditInput(e.target.value)}
                          className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                        />
                      ) : (
                        dishType.name
                      )}
                    </td>
                    <td className="border-b px-4 py-2">
                      {editMode.type === "dishType" && editMode.id === dishType._id ? (
                        <>
                          <button
                            onClick={() => {
                              handleEdit("dishType", dishType._id, editInput);
                              setEditMode({ type: null, id: null });
                              setEditInput("");
                            }}
                            className="text-white px-3 py-1 bg-green-600 rounded-md shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditMode({ type: null, id: null });
                              setEditInput("");
                            }}
                            className="text-white px-3 py-1 bg-gray-600 rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditMode({ type: "dishType", id: dishType._id });
                              setEditInput(dishType.name);
                            }}
                            className="text-white px-3 py-1 mr-2 rounded-md bg-customGreen hover:bg-[#4E8A5A] active:bg-[#335C3D] transition duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete("dishType", dishType._id)}
                            className="text-white px-3 py-1 bg-red-600 rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              placeholder="Add new dish type"
              className="border border-gray-300 rounded-lg px-4 py-2 mr-4 w-1/2"
              value={dishTypeInput}
              onChange={(e) => setDishTypeInput(e.target.value)}
            />
            <button
              onClick={() => {
                handleAdd("dishType", dishTypeInput);
                setDishTypeInput("");
              }}
              className="text-white px-3 py-1 mr-2 bg-customGreen hover:bg-[#4E8A5A] active:bg-[#335C3D] transition duration-200 rounded-md"
            >
              Add Dish Type
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
