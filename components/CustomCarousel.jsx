"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

export default function CustomCarousel() {
    const [recipes, setRecipes] = useState([]);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,  // Enable looping to make the carousel infinite
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        // Fetch data from the API
        const fetchRecipes = async () => {
            try {
                const response = await fetch("/api/recipes/random");
                const data = await response.json();
                setRecipes(data);
            } 
            
            catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();

        // Auto scroll the carousel every 3 seconds
        const autoScroll = setInterval(() => {
            if (emblaApi) {
                emblaApi.scrollNext(); // Continue scrolling next
            }
        }, 3000); // 3000ms = 3 seconds

        // Clear the interval on component unmount
        return () => clearInterval(autoScroll);

    }, [emblaApi]);

    return (
        <div className="embla flex flex-row">

            <div className="flex">
                <button className="embla__prev" onClick={scrollPrev}>
                    <Image src="/left.png" alt="Left" width={0} height={0} className="w-2/3 h-auto" />
                </button>
            </div>
          
            <div className="embla__viewport h-[400px]" ref={emblaRef}>
                <div className="embla__container h-full">
                    {recipes.map((recipe, index) => (
                        <Link key={index} href={`/recipes/${recipe._id}`}>
                          <div className="embla__slide flex w-[1000px]">

                              <Image
                                  src={recipe.image}
                                  alt={recipe.cuisine}
                                  width={0}
                                  height={0}
                                  className="w-[500px] h-[400px] object-cover rounded-none"
                              />

                              <div className="flex flex-col px-9 w-[1500px]">
                                  <h1 className="text-4xl font-bold text-customDarkGreen font-serif">
                                      {recipe.title}
                                  </h1>

                                  <div className="flex flex-row items-center mt-3">
                                      <div className="flex mr-16 items-center">
                                          <Image
                                              src="/timer.png"
                                              alt="Timer"
                                              width={20}
                                              height={20}
                                              className="mr-3"
                                          />
                                          <h1 className="font-sans text-customDarkGreen text-[16px] font-semibold">
                                              {recipe.readyInMinutes} min
                                          </h1>
                                      </div>
                                  </div>

                                  <div className="flex flex-col mt-8">
                                    <div dangerouslySetInnerHTML={{ __html: recipe.summary }}></div> 
                                    <hr className="border-customGreen border-[2px] mt-7" />
                                  </div>

                                  <div className="mt-7">
                                    <h1 className="font-sans text-customDarkGreen text-[16px] font-bold">{recipe.sourceName}</h1>
                                    <h1 className="font-sans text-customDarkGreen text-[16px]">
                                      {new Date(recipe.createdAt).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                      })}
                                    </h1>
                                  </div>
                              </div>
                          </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex">
                <button className="embla__next" onClick={scrollNext}>
                    <Image src="/right.png" alt="Right" width={0} height={0} className="w-2/3 h-auto" />
                </button>
            </div>
        </div>
    );
}
