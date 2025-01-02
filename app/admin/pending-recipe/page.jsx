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

  const fetchPendingRecipes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/get-pending-recipes");
      const data = await response.json();
      if (response.ok) {
        setRecipes(data.recipes || []);
      } else {
        setError(data.error || "Failed to fetch pending recipes.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching pending recipes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRecipes();
  }, []);

  const handleAction = async (id, status, currentStatus) => {
    setLoading(true);
    try {
      let response;

      // Delete the created recipe from the database, if admin reject the request
      if (currentStatus === "pending-create" && status === "rejected") {
        response = await fetch(`/api/admin/recipe-action/${id}`, { method: "DELETE" });
      } 
      
      // Delete the created recipe from the database, if admin approve deletetion
      else if (currentStatus === "pending-delete" && status === "approved") {
        response = await fetch(`/api/admin/recipe-action/${id}`, { method: "DELETE" });
      }

      else {
        response = await fetch(`/api/admin/recipe-action/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status, currentStatus }),
        });
      }

      if (response.ok) {
        setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
        console.log(`Recipe ${status} successfully.`);
      } 
      
      else {
        const data = await response.json();
        setError(data.error || "Failed to process the action.");
      }
    } 
    
    catch (error) {
      console.error(error);
      setError("An error occurred while processing the action.");
    } 
    
    finally {
      setLoading(false);
      fetchPendingRecipes();
    }
  };

  if (loading || status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {recipes.length === 0 ? (
        <p>No pending recipes found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Id</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Link</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td className="border border-gray-300 px-4 py-2">{recipe.id || "Untitled"}</td>
                <td className="border border-gray-300 px-4 py-2">{recipe.title || "Untitled"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link href={`/recipes/${recipe.id}`}>View recipe</Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">{recipe.status || "Untitled"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Button color="success" onClick={() => handleAction(recipe.id, "approved", recipe.status)} className="mr-2">
                    Approve
                  </Button>
                  <Button color="error" onClick={() => handleAction(recipe.id, "rejected", recipe.status)}>
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
