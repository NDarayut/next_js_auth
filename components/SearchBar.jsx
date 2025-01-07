"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchBar () {

    const [query, setQuery] = useState("")
    const [isListening, setListening] = useState(false)
    const router = useRouter()

    const handleSearch = async (e) => {
        e.preventDefault()
        if(query.trim() !== ""){
            router.push(`/search?query=${query}`)
        }
    }

    const handleVoiceSearch = () =>{
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition() // create a method using the SpeechRecognition class


        recognition.lang = "en-US" // Use english language first
        recognition.interimResults = false; // Only final results
        recognition.maxAlternatives = 1; // Single result

        recognition.onstart = () =>{
            setListening(true)
        }

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript; // Get recognized text
            setQuery(transcript); // Update query state

            // Perform search automatically after updating the query
            setTimeout(() => {
                if (transcript.trim() !== "") {
                router.push(`/search?query=${transcript}`);
                }
            }, 0);
        };

        recognition.onend = () => {
            setListening(false);
        };
    
        recognition.start();
    }

    return(
        <div className="flex justify-center items-center py-4">
            <form onSubmit={handleSearch}>
                <div className="relative w-full max-w-[600px] flex items-center">
                    {/* Search Input */}

                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        type="text"
                        className="w-full p-2 pl-10 text-sm text-customGreen rounded-[30px] border-[2px] border-customGreen bg-customYellow shadow focus:outline-none focus:ring-2 focus:ring-customGreen focus:bg-white]"
                        placeholder="Search..."
                    />

                    {/* Search Icon */}

                    <svg
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                    </svg>

                    {/* Microphone Button */}
                    <button
                        type="button"
                        onClick={handleVoiceSearch}
                        className="ml-2 p-2 bg-customGreen text-white rounded-full focus:outline-none"
                    >
                        {isListening ? (
                        <svg
                            className="w-6 h-6 animate-pulse"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 18v-6m0 0V9a3 3 0 00-6 0v3m6 0a3 3 0 016 0v3m-6 0h6"
                            />
                        </svg>
                        ) : (
                        <svg
                            className="w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 14a4 4 0 004-4V7a4 4 0 00-8 0v3a4 4 0 004 4z"
                            />
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 14v2a4 4 0 004 4m0-6h8"
                            />
                        </svg>
                        )}
                    </button>
                </div>
            </form>
            
        </div>
    )
}