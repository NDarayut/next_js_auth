"use client"

import {Card, CardHeader} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react"

export default function RelatedCard({recipeId, src, title, rating}) {
    

    const {data: session, status} = useSession()
    const [error, setError] = useState("")

    if (status === "loading") {
    return <div>Loading...</div>; // Or return a loading spinner
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
        <div className="flex flex-col space-y-4">
            <Link href={`/recipes/${recipeId}`}>
                <Card className="w-[350px] rounded-none h-[120px] bg-customYellow transform hover:shadow-md hover:scale-105 transition-transform duration-300 ease-in-out shadow-none">
                    <CardHeader className="flex flex-row items-center h-full p-0">
                        {/* Image Section */}
                        <div className="h-[120px] w-[150px] flex-shrink-0">
                            <Image 
                                src={src}
                                alt={title}
                                width={0}
                                height={0}
                                style={{ width: '100%', height: '100%' }}
                                className="object-cover rounded-none"
                            />
                        </div>

                        {/* Text Section (Stars and Title) */}
                        <div className="ml-4 flex flex-col justify-center overflow-hidden">
                            <div className="mb-1">{renderStars()}</div> {/* Display stars */}
                            <h1 className="text-sm font-semibold text-customDarkGreen truncate">{title}</h1>
                        </div>
                    </CardHeader>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </Card>


            </Link>
        </div>

    );
}
