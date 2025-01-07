"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CategoryPage({params}) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const { slug } = params// Get the category slug from the URL
  
  useEffect(() => {
    if (!slug) return; // Wait for the slug to be available (avoid undefined errors)
    
    // Fetch recipes based on the selected category (slug)
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`/api/recipes/dishtypes/${slug}`);
        if (!res.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await res.json();
        setRecipes(data); // Set the fetched recipes to the state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };
    
    fetchRecipes(); // Call the function to fetch recipes
    
  }, [slug]); // Run the effect when the slug changes
  
  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Recipes in {slug.replace("-", " ").toUpperCase()} Category</h1>
      {recipes.length === 0 ? (
        <p>No recipes found in this category.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.summary}</p>
              <img src={recipe.image} alt={recipe.title} width="200" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
