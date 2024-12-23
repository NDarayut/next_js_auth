"use client"

import {Card, CardHeader, CardBody, Image, Button} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {useState} from "react"

export default function RecipeCard({recipeId, src, title, isFavorited, sourceName, rating, readyInMinutes}) {

  const [favorited, setFavorited] = useState(isFavorited  || false)
  const {data: session, status} = useSession()
  const [error, setError] = useState("")

  if (status === "loading") {
    return <div>Loading...</div>; // Or return a loading spinner
  }

  const handleFavorite = async () =>{

    if(!session || !session.user){
      setError("Please log in to favorite recipe")
      return
    }
    console.log("Session on client: ", session)
    console.log("Recipe ID: ", {recipeId})

    try {
      const response = await fetch("/api/favorite/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId }), // Send the recipe ID
      });

      const data = await response.json();

      console.log("Data: ", data)
      if (response.ok) {
        setFavorited(true); // Mark as favorited
      } 
      else {
       
        setError(data.message); // Handle error (e.g., already favorited)
      }
    } 
    catch (err) {
      setError("Failed to favorite the recipe.");
    }

  }

  const renderStars = () => {
    const stars = Array.from({ length: 5 }, (_, i) => (i < Math.round(rating/20) ? "★" : "☆"));
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
                className="rounded-[5px]"
                src={src}
                alt={title}
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
              <img 
                src="/default.png" 
                alt="Profile Icon" 
                className="w-6 h-6 rounded-full" 
              />
              <h1 className="font-sans font-medium text-[14px] text-customDarkGreen">{sourceName}</h1>
            </div>
            <a href={`/recipes/${recipeId}`} className="font-sans font-medium text-[14px] text-blue-800 underline absolute bottom-0 right-3">See detail</a>
           <div className='flex items-center absolute bottom-0 left-3'>
              <Image src="/timer.png" className="w-[15px] h-[15px] mr-1" />    
              <h1 className='font-sans text-customDarkGreen text-[14px] font-normal'>{readyInMinutes} mins</h1>
           </div>
            
          </div>
          
        </CardBody>
        </Link>
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
      </Card>
    
  );
}
