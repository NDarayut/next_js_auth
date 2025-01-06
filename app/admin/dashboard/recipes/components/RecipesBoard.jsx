import { Spinner } from "@nextui-org/react";
import Link from "next/link";

export default function RecipesBoard({error, recipes, loading, loadMoreRecipes, handleDelete, handleEdit}) {

    return (
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h1 className="text-3xl font-bold text-customDarkGreen mb-6">All Recipes</h1>

            {error && <p className="text-red-600 bg-red-100 border border-red-300 rounded-lg p-3 mb-6">{error}</p>}

            {recipes.length === 0 ? (
                <p className="text-gray-600 text-lg">No recipes available.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg shadow-lg bg-white">
                        <thead>
                            <tr className="bg-customLightBrown text-customDarkGreen font-extrabold">
                                <th className="px-6 py-3 text-left text-sm font-medium">Created by</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Created at</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Link</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipes.map((recipe, index) => (
                                <tr
                                    key={recipe._id}
                                    className={`${index % 2 === 0 ? "bg-customYellow" : "bg-customLightBrown"} hover:bg-[#EDE6D6] ${index % 2 !== 0 && "hover:bg-[#D6C7BC]"} transition duration-150`}
                                >
                                    <td className="px-6 py-4 text-sm font-light">{recipe.sourceName || "Untitled"}</td>
                                    <td className="text-sm text-gray-500">{new Date(recipe.createdAt).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm font-light max-w-60 truncate">{recipe.title || "Untitled"}</td>
                                    <td className="px-6 py-4 text-sm font-light">
                                        <Link
                                            href={`/recipes/${recipe._id}`}
                                            className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                            View Recipe
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-light">
                                        <button onClick={() => handleEdit(recipe._id)}  className="px-4 py-2 text-white bg-green-600 rounded-md shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 mr-2">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(recipe._id)} className="px-4 py-2 text-white bg-red-600 rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center mt-6">
                    <Spinner />
                </div>
            ) : (
                <div className="flex justify-center mt-6">
                    <button onClick={loadMoreRecipes} color="primary" size="lg">
                        Load More Recipes
                    </button>
                </div>
            )}
        </div>
    )
}