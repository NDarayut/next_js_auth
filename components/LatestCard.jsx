import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {useState} from "react"

export default function LatestCard({ recipeId, src, title, isFavorited, createdAt, onRemove }) {

  const [favorited, setFavorited] = useState(isFavorited  || false)
  const {data: session, status} = useSession()
  const [error, setError] = useState("")

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

  return (
    <Card className="w-[600px] rounded-[10px] bg-customYellow transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* Card Header: Image */}
      <CardHeader className="p-0">
        <Image
          src={src || "/default-image.jpg"} // Fallback to a default image if src is not provided
          alt={title || "Recipe Image"}
          width={0}
          height={0}
          className="w-full h-[300px] rounded-none"
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

      {/* Card Body: Title, Date, and Actions */}
      <Link href={`/recipes/${recipeId}`}>
      <CardBody className="py-8 px-5">
        <div className="flex flex-row items-start justify-between">
          {/* Title and Date */}
          <div className="w-[400px] mr-3">
            <h1 className="font-serif font-bold text-left text-[30px] text-customDarkGreen">{title}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </CardBody>
      </Link>
    </Card>
  );
}
