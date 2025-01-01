import React, { useRef } from "react";
import Link from "next/link"; // Import Link from next/link

const CustomRoundCarousel = () => {
  const items = [
    { id: 1, src: "/pasta.jpg", label: "Asian" },
    { id: 2, src: "/pizza.jpg", label: "Chinese" },
    { id: 3, src: "/vegan.jpg", label: "American" },
    { id: 4, src: "/desserts.jpg", label: "Mexican" },
    { id: 5, src: "/smoothies.jpg", label: "Italian" },
    { id: 6, src: "/breakfast.jpg", label: "Latin American" },
    { id: 7, src: "/snacks.jpg", label: "European" },
    { id: 8, src: "/soup.jpg", label: "Mediterranean" },
    { id: 9, src: "/smoothies.jpg", label: "French" },
    { id: 10, src: "/breakfast.jpg", label: "Scottish" },
    { id: 11, src: "/snacks.jpg", label: "British" },
    { id: 12, src: "/soup.jpg", label: "Thai" },
  ];

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    const slideWidth = carouselRef.current.firstChild.offsetWidth;
    carouselRef.current.scrollBy({ left: -slideWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    const slideWidth = carouselRef.current.firstChild.offsetWidth;
    carouselRef.current.scrollBy({ left: slideWidth, behavior: "smooth" });
  };

  return (
    <div className="bg-customYellow py-8 relative">
      {/* Left button */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 px-0 py-2"
        onClick={scrollLeft}
      >
        <img src="/left.png" className="w-4 h-auto" />
      </button>

      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="w-full overflow-x-auto flex scrollbar-hide scroll-snap-x scroll-smooth"
        style={{
          scrollSnapType: "x mandatory",
        }}
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/recipes/cuisines/${item.label.toLowerCase()}`} // Link to the cuisine page
            className="flex flex-col items-center flex-shrink-0 w-1/6 scroll-snap-align-center"
          >
            <img
              src={item.src}
              alt={item.label}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md"
            />
            <p className="mt-2 text-sm font-medium text-black">{item.label}</p>
          </Link>
        ))}
      </div>

      {/* Right button */}
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 px-0 py-2"
        onClick={scrollRight}
      >
        <img src="/right.png" className="w-4 h-auto" />
      </button>
    </div>
  );
};

export default CustomRoundCarousel;
