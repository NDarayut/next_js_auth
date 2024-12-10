"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SearchBar () {

    const [query, setQuery] = useState("")
    const router = useRouter()

    const handleSearch = async (e) => {
        e.preventDefault()
        if(query.trim() !== ""){
            router.push(`/search?query=${query}`)
        }
    }

    return(
        <div className="flex justify-center items-center py-4">
            <form onSubmit={handleSearch}>
                <div className="relative w-full max-w-[600px]">
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
                </div>
            </form>
            
        </div>
    )
}