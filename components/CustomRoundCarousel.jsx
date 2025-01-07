import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const CustomRoundCarousel = () => {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  // Unslugify function
  function unslugify(slug) {
    return slug
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  }

  const fetchCuisines = async () => {
    try {
      const res = await fetch("/api/categories/cuisines");
      if (!res.ok) throw new Error("Failed to fetch cuisines");

      const cuisineData = await res.json();

      // Fetch one recipe image for each cuisine
      const cuisinesWithImages = await Promise.all(
        cuisineData.map(async (cuisine) => {
          const recipeRes = await fetch(`/api/recipes/cuisines/${cuisine.name}`);
          if (!recipeRes.ok) throw new Error("Failed to fetch recipe image");

          const recipes = await recipeRes.json();
          const image = recipes[0]?.image || "/default-image.jpg"; // Fallback image
          return { ...cuisine, image };
        })
      );

      setCuisines(cuisinesWithImages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuisines();
  }, []);

  const scrollLeft = () => {
    const slideWidth = carouselRef.current.firstChild.offsetWidth;
    carouselRef.current.scrollBy({ left: -slideWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    const slideWidth = carouselRef.current.firstChild.offsetWidth;
    carouselRef.current.scrollBy({ left: slideWidth, behavior: "smooth" });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-customYellow py-8 relative">
      {/* Left button */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 px-0 py-2"
        onClick={scrollLeft}
      >
        <Image
          src="/left.png"
          alt="Left"
          width={0}
          height={0}
          className="w-4 h-auto"
        />
      </button>

      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="w-full overflow-x-auto flex scrollbar-hide scroll-snap-x scroll-smooth"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {cuisines.map((cuisine) => (
          <Link
            key={cuisine._id}
            href={`/cuisines/${cuisine.name}`}
            className="flex flex-col items-center flex-shrink-0 w-1/6 scroll-snap-align-center"
          >
            <Image
              src={cuisine.image}
              alt={cuisine.name}
              width={0}
              height={0}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md"
            />
            <p className="mt-2 text-sm font-medium text-black">{unslugify(cuisine.name)}</p>
          </Link>
        ))}
      </div>

      {/* Right button */}
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 px-0 py-2"
        onClick={scrollRight}
      >
        <Image
          src="/right.png"
          alt="Right"
          width={0}
          height={0}
          className="w-4 h-auto"
        />
      </button>
    </div>
  );
};

export default CustomRoundCarousel;
