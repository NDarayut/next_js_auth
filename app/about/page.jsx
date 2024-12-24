"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function About() {

    const [stats, setStats] = useState({
        usersCount: 0,
        recipesCount: 0,
        reviewsCount: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/stats');
                if (!response.ok) throw new Error("Failed to fetch stats");
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="bg-customYellow min-h-screen">
            {/* Sticky Navbar */}
            <div className="sticky top-0 bg-customYellow z-50">
                <Navbar />
            </div>

            {/* Hero Section with Parallax */}
            <div className="relative h-screen bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/about_img.jpg')" }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-white text-5xl md:text-7xl font-bold text-center px-4">
                        Discover the Joy of Cooking! <br /> Recipes Tailored Just for You.
                    </h1>
                </div>
            </div>

            {/* Mission Section */}
            <div className="bg-customYellow h-screen px-8 py-16 flex flex-col justify-center">
                <h2 className="text-customDarkGreen font-serif text-6xl mb-12 text-center">Our Mission</h2>
                <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto text-center">
                    At our core, we believe cooking is an art that brings people together. Our mission is to inspire 
                    and empower home chefs of all levels with personalized recipes that suit their taste, lifestyle, 
                    and preferences. Cooking should be fun, and we’re here to make it happen!
                </p>
            </div>

            {/* Fun Stats Section */}
            <div className="bg-customBrown px-8 py-16">
                <h2 className="text-customDarkGreen font-serif text-4xl mb-6 text-center">What We’ve Achieved</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h3 className="text-5xl font-bold text-customGreen">
                            {stats.recipesCount}+
                        </h3>
                        <p className="text-gray-600 mt-2">Recipes Recommended</p>
                    </div>
                    <div>
                        <h3 className="text-5xl font-bold text-customGreen">
                            {stats.usersCount}+
                        </h3>
                        <p className="text-gray-600 mt-2">Happy Users</p>
                    </div>
                    <div>
                        <h3 className="text-5xl font-bold text-customGreen">
                            {stats.reviewsCount}+
                        </h3>
                        <p className="text-gray-600 mt-2">Reviews Written</p>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-customYellow h-screen px-8 py-16 flex flex-col justify-center">
                <h2 className="text-customDarkGreen font-serif text-6xl mb-36 text-center">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <img src="/recipe.png" alt="Step 1" className="mx-auto w-24 h-auto mb-4" />
                        <h3 className="text-2xl font-bold">Step 1</h3>
                        <p className="text-gray-600">Tell us the recipe.</p>
                    </div>
                    <div className="text-center">
                        <img src="/task.png" alt="Step 2" className="mx-auto w-24 h-auto mb-4" />
                        <h3 className="text-2xl font-bold">Step 2</h3>
                        <p className="text-gray-600">Get detailed instruction.</p>
                    </div>
                    <div className="text-center">
                        <img src="/cook.png" alt="Step 3" className="mx-auto w-24 h-auto mb-4" />
                        <h3 className="text-2xl font-bold">Step 3</h3>
                        <p className="text-gray-600">Cook, enjoy, and share your creations!</p>
                    </div>
                </div>
            </div>

            {/* Our Story Section with Parallax */}
            <div 
                className="relative h-screen bg-fixed bg-center bg-cover flex items-center justify-center" 
                style={{ backgroundImage: "url('/our_story.png')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                
                <div className="relative max-w-4xl text-center text-white px-8">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Story</h2>
                    <p className="text-lg md:text-xl leading-relaxed">
                        It all started with a simple idea: to make cooking accessible, fun, and personalized for everyone. 
                        From humble beginnings as a home-based project, we’ve grown into a community-driven platform that 
                        celebrates the joy of food and the art of cooking.
                    </p>
                    <p className="text-lg md:text-xl leading-relaxed mt-4">
                        Our journey began with a love for experimenting in the kitchen and a mission to share that love with others. 
                        Today, we’re proud to help millions of home cooks discover new recipes, recreate cherished classics, 
                        and build their confidence in the kitchen. Thank you for being part of our story – we can’t wait 
                        to see what you’ll cook next!
                    </p>
                </div>
            </div>



            {/* Call to Action Section */}
            <div className="relative bg-customDarkGreen text-white px-8 py-20 text-center">
                <h2 className="text-4xl font-bold mb-4">Ready to Discover Your Next Favorite Recipe?</h2>
                <p className="text-lg mb-8">
                    Join thousands of food lovers and start your culinary journey today. 
                    Sign up for free and explore endless possibilities!
                </p>
                <Link href="/register">
                    <button className="bg-white text-customDarkGreen px-6 py-3 rounded-full font-bold hover:bg-gray-200">
                        Get Started Now
                    </button>
                </Link>
            </div>

            <Footer />
        </div>
    );
}
