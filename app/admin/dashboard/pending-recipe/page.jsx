"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import PendingApproval from "./components/PendingApproval";
import SideBar from "../components/SideBar";

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
        setRecipes(data || []);
      } else {
        setError(data.error || "Failed to fetch pending recipes.");
      }
    } 
    
    catch (error) {
      console.error(error);
      setError("An error occurred while fetching pending recipes.");
    } 
    
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    try {
      const response = await fetch(`/api/admin/recipe-action/${recipeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete recipe");
      }

      // Remove the deleted recipe from the UI without reloading the page
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } 
    
    catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleAction = async (id, status, currentStatus, e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let response;

      // Delete the recipe from the database if admin rejects the request
      if (currentStatus === "pending-create" && status === "rejected") {
        await handleDelete(id); // Call handleDelete for rejection
        return; // No need to proceed with further logic
      }

      // Delete the recipe from the database if admin approves deletion
      else if (currentStatus === "pending-delete" && status === "approved") {
        await handleDelete(id); // Call handleDelete for approval of deletion
        return; // No need to proceed with further logic
      }

      // Update recipe status if not deleting
      response = await fetch(`/api/admin/recipe-action/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, currentStatus }),
      });

      if (response.ok) {
        setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
        console.log(`Recipe ${status} successfully.`);
      } else {
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
    }
  };

  if (status === "unauthenticated") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 p-8">
        {/* Comment Review Section */}
        <PendingApproval error={error} recipes={recipes} handleAction={handleAction} />
      </main>
    </div>
  );
}
