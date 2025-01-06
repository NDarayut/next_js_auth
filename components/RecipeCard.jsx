"use client"

import {Card, CardHeader, CardBody, Button} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {useState} from "react"

import Image from "next/image";

export default function RecipeCard({recipeId, src, title, isFavorited, sourceName, averageRating, readyInMinutes, onRemove}) {

  const [favorited, setFavorited] = useState(isFavorited  || false)
  const {data: session, status} = useSession()
  const [error, setError] = useState("")

  if (status === "loading") {
    return <div>Loading...</div>; // Or return a loading spinner
  }

  const handleFavorite = async () => {
    try {

  
      if (!session?.user?.role) {
        setError("Please log in to favorite recipes");
        return;
      }
  
      const endpoint = favorited ? "/api/favorite/remove" : "/api/favorite/add";
      const method = favorited ? "DELETE" : "POST";
  
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setFavorited(!favorited);
        if (favorited && onRemove) {
          // Call onRemove only if the recipe is being unfavorited
          onRemove(recipeId);
        }
      } else {
        setError(data.message || "Failed to update favorite status");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while updating favorites.");
    }
  };
  

  const renderStars = () => {
    // Assuming `score` is the average rating, which should be between 1 and 5
    const numStars = Math.round(averageRating); // Round the score to the nearest whole number
    const stars = Array.from({ length: 5 }, (_, i) => (i < numStars ? "★" : "☆"));
    
    return (
      <div className="flex items-center space-x-1 text-customOrange">
        {stars.map((star, index) => (
          <span key={index} className="text-2xl">
            {star}
          </span>
        ))}
      </div>
    );
  };

  return (
    
      <Card className="w-[300px] h-[450px] rounded-[5px]  bg-customYellow transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <CardHeader className="p-0 relative" >
          <Image 
            src={src}
            alt={title}
            width={0}
            height={0}
            className="rounded-[5px] w-auto h-[200px]"            
          />

          <Button
              onClick={handleFavorite}
              className={`absolute top-2 right-2 ${
                favorited ? "bg-red-500" : "bg-gray-300"
              } text-white rounded-full p-2 z-10`}
            >
              {favorited ? "♥" : "♡"}
          </Button>

        </CardHeader>
        <Link href={`/recipes/${recipeId}`}>
        <CardBody>
          <div className= "w-56 h-52 px-2">
            <div className="">{renderStars()}</div> {/* Display stars */}
            <h1 className="font-sans font-bold text-left text-[18px] text-customDarkGreen mb-3">{title}</h1>
            <div className="flex items-center gap-2"> {/* Flex container for profile picture and sourceName */}
              <Image 
                src="/default.png" 
                alt="Profile Icon" 
                width={0}
                height={0}
                className="w-6 h-6 rounded-full" 
              />
              <h1 className="font-sans font-medium text-[14px] text-customDarkGreen">{sourceName}</h1>
            </div>
            <p className="font-sans font-medium text-[14px] text-blue-800 underline absolute bottom-0 right-3"><u>See detail</u></p>
           <div className='flex items-center absolute bottom-0 left-3'>
              <Image 
                src="/timer.png" 
                alt="Time to cook"
                width={0}
                height={0}
                className="w-[15px] h-[15px] mr-1"
              />  
              <h1 className='font-sans text-customDarkGreen text-[14px] font-normal'>{readyInMinutes} mins</h1>
           </div>

          </div>
          
        </CardBody>
        </Link>
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
      </Card>
    
  );
}
