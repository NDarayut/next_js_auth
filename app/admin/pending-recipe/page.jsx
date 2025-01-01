"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState([]);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPendingRecipes = async () => {
      try {
        const response = await fetch("/api/admin/pendingRecipes");
        const data = await response.json();
        if (response.ok) {
          setRecipes(data.recipes || []);
        } else {
          setError(data.error || "Failed to fetch pending recipes.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching pending recipes.");
      }
    };

    fetchPendingRecipes();
  }, []);

  const handleAction = async (id, status) => {
    try {
      console.log("Action Request:", { id, status });
      const response = await fetch(`/api/admin/recipeAction`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setRecipes((prev) => prev.filter((recipe) => recipe.id !== id)); // Remove processed recipe
        console.log(`Recipe status updated to '${status}' successfully.`);
      } 
      else {
        console.error(data.error);
        setError(data.error || `Failed to update recipe status to '${status}'.`);
      }
    } catch (err) {
      console.error(err);
      setError(`An error occurred while trying to update the recipe status to '${status}'.`);
    }
  };

  if(status === "loading"){
    return(
      <div>Loading...</div>
    )
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p>No pending recipes found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Id</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Link</th>
              <th className="border border-gray-300 px-4 py-2">status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {recipe.id || "Untitled"}
                </td>
               
                  <td className="border border-gray-300 px-4 py-2"> 
                      {recipe.title || "Untitled"}
                  </td>
                
                <td className="border border-gray-300 px-4 py-2">
                  <Link href={`/recipes/${recipe.id}`}>View recipe</Link>
                </td>
                <td className="border border-gray-300 px-4 py-2"> 
                      {recipe.status || "Untitled"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Button
                    color="success"
                    onClick={() => handleAction(recipe.id, "approved")}
                    className="mr-2"
                  >
                    Approve
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleAction(recipe.id, "rejected")}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
