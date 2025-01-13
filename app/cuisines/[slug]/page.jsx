"use client"
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function CuisinePage({params}) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { slug } = params// Get the cuisines slug from the URL
  const cuisine = unslugify(slug);

  // Unslugify function
  function unslugify(slug) {
    return slug
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  }
  
  useEffect(() => {
    if (!slug) return; // Wait for the slug to be available (avoid undefined errors)
    
    // Fetch recipes based on the selected cusines(slug)
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`/api/recipes/cuisines/${slug}`);
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

  // Extract 1 image so we can use the image as an example
  const cuisineExample = recipes.length > 0 ? recipes[0] : null;
  
  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-customYellow min-h-screen">
        <div className="mb-40">
            <Navbar />
        </div>

        {/* Display Recipes */}
        <main className="px-[60px]">


            {/* Display Recipes */}
              {cuisineExample ? (
                <div className="flex items-center mb-28 px-14 gap-10">
                  <Image
                    src={cuisineExample.image}
                    alt={cuisineExample.title}
                    width={0}
                    height={0}
                    className="w-52 h-52 rounded-full"
                  />
                  <h1 className="text-customDarkGreen text-5xl font-serif font-bold">
                    {cuisine}
                  </h1>
                </div>
              ) : (
                <div className="mb-28 px-14">
                  <h1 className="text-customDarkGreen text-5xl font-serif font-bold">
                    {cuisine}
                  </h1>
                  <p className="text-gray-600 mt-4">No image available for this cuisine.</p>
                </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 p-4 mb-11">
            {recipes.length > 0 ? (
                recipes.map((recipe) => (
                <RecipeCard
                    key={recipe._id}
                    recipeId={recipe._id}
                    src={recipe.image}
                    title={recipe.title}
                    isFavorited={false}
                    sourceName={recipe.sourceName}
                    rating={recipe.score}
                    readyInMinutes={recipe.readyInMinutes}
                />
                ))
            ) : (
                <p>No recipes found.</p>
            )}
            </div>
        </main>
        <Footer />
    </div>
  );
}
