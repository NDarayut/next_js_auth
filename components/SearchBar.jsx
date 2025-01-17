"use client"

import Image from "next/image"
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
        // Web Speech API is not supported universally under a single name, so we use webkitspeech...
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition() // create an instance using the SpeechRecognition class

        recognition.lang = "en-US" // Use english language first
        recognition.interimResults = true; // Only final results
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

                    <Image 
                        src="/search.png"
                        alt="search"
                        width={0}
                        height={0}
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5"
                    />

                    {/* Microphone Button */}
                    <button
                        type="button"
                        onClick={handleVoiceSearch}
                        className="ml-2 p-2 bg-customGreen text-white rounded-full focus:outline-none"
                    >
                        {isListening ? (
                        <Image 
                            src="/islistening.png"
                            alt="listen"
                            width={0}
                            height={0}
                            className="w-7 h-6"
                        />
                        ) : (
                        <Image 
                            src="/notlistening.png"
                            alt="notlisten"
                            width={0}
                            height={0}
                            className="w-7 h-6"
                        />
                        )}
                    </button>
                </div>
            </form>
            
        </div>
    )
}