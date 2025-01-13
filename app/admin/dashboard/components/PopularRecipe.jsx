"use client"

import {Card, CardHeader} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react"

export default function PopularCard({recipeId, src, title, rating}) {
    
    const {data: session, status} = useSession()

    if (status === "loading") {
    return <div>Loading...</div>; // Or return a loading spinner
    }

    return (
        <div className="flex flex-col space-y-4">
            <Link href={`/recipes/${recipeId}`}>
                <Card className="w-full rounded-none h-[120px] bg-customYellow transform hover:shadow-md hover:scale-105 transition-transform duration-300 ease-in-out shadow-none">
                    <CardHeader className="flex flex-row items-center h-full p-0">
                        {/* Image Section */}
                        <div className="h-[120px] w-[200px] flex-shrink-0">
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
                            <h1 className="text-lg font-bold text-customDarkGreen truncate mb-3">{title}</h1>
                            <h1 className="mb-1">Ratings: {Math.round(rating)}</h1> {/* Display rating */}
                        </div>
                    </CardHeader>
                </Card>
            </Link>
        </div>

    );
}
