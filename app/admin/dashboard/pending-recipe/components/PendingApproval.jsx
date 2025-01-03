import { Link } from "@nextui-org/react";

export default function PendingApproval({ error, recipes, handleAction }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h1 className="text-3xl font-bold text-customDarkGreen mb-6">All Pending Request</h1>
      
      {error && <p className="text-red-600 bg-red-100 border border-red-300 rounded-lg p-3 mb-6">{error}</p>}
      
      {recipes.length === 0 ? (
        <p className="text-gray-600 text-lg">No pending recipes found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg shadow-lg bg-white">
            <thead>
              <tr className="bg-customDarkBrown text-customDarkGreen font-extrabold">
                <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Link</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe, index) => (
                <tr
                  key={recipe.id}
                  className={`${
                    index % 2 === 0 ? "bg-customYellow" : "bg-customLightBrown"
                  } hover:bg-[#EDE6D6] ${
                    index % 2 !== 0 && "hover:bg-[#D6C7BC]"
                  } transition duration-150`}
                >
                  <td className="px-6 py-4 text-sm font-light">{recipe.id || "Untitled"}</td>
                  <td className="px-6 py-4 text-sm font-light">{recipe.title || "Untitled"}</td>
                  <td className="px-6 py-4 text-sm font-light">
                    <Link
                      href={`/recipes/${recipe.id}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View Recipe
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm font-light">{recipe.status || "Untitled"}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={(e) => handleAction(recipe.id, "approved", recipe.status, e)}
                      className="px-4 py-2 text-white bg-green-600 rounded-md shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={(e) => handleAction(recipe.id, "rejected", recipe.status, e)}
                      className="px-4 py-2 text-white bg-red-600 rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
