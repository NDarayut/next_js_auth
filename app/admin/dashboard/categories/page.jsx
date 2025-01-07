"use client";

import { useState, useEffect } from "react";
import Categories from "./components/Categories";
import SideBar from "../components/SideBar";

export default function AdminDashboard() {
  const [cuisines, setCuisines] = useState([]);
  const [dishTypes, setDishTypes] = useState([]);
  const [editing, setEditing] = useState({ type: null, id: null, name: "" });

  // Fetch Cuisines and DishTypes on Load
  useEffect(() => {
    fetchCuisines();
    fetchDishTypes();
  }, []);

  const fetchCuisines = async () => {
    const res = await fetch("/api/categories/cuisines");
    if (res.ok) {
      const data = await res.json();
      setCuisines(data);
    }
  };

  const fetchDishTypes = async () => {
    const res = await fetch("/api/categories/dishtypes");
    if (res.ok) {
      const data = await res.json();
      setDishTypes(data);
    }
  };

  const handleAdd = async (type, name) => {
    if (!name.trim()) return;

    const url = `/api/categories/${type === "cuisine" ? "cuisines" : "dishtypes"}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      type === "cuisine" ? fetchCuisines() : fetchDishTypes();
    }
  };

  const handleDelete = async (type, id) => {
    const url = `/api/categories/${type === "cuisine" ? "cuisines" : "dishtypes"}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      type === "cuisine" ? fetchCuisines() : fetchDishTypes();
    }
  };

  const handleEdit = async (type, id, name) => {
    const url = `/api/categories/${type === "cuisine" ? "cuisines" : "dishtypes"}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name }),
    });
    if (res.ok) {
      setEditing({ type: null, id: null, name: "" });
      type === "cuisine" ? fetchCuisines() : fetchDishTypes();
    }
  };

  return (
    <div className="flex min-h-screen">
        <SideBar />

        <main className="flex-1 p-8">
            <Categories
                cuisines={cuisines}
                dishTypes={dishTypes}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            
        </main>
      
    </div>
  );
}
