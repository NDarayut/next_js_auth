"use client"

import {Card, CardHeader, CardBody, Image, Button} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import {useState} from "react"

export default function RecipeCard({recipeId, src, title, isFavorited}) {

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
  return (
    <Card className="w-[300px] h-[470px] rounded-[5px]  bg-customYellow">
      <CardHeader className="p-0 relative">
        <Image  
              className="rounded-none"
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
      
      <CardBody>
        <h1 className="font-sans font-bold text-left text-[18px]">{title}</h1>
      </CardBody>
      {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
    </Card>
  );
}
