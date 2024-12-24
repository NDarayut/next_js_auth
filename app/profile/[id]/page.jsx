"use client"

import { useParams } from "next/navigation"
import UserProfile from "@/components/UserProfile"
import { useSession } from "next-auth/react"
import Navbar from "@/components/Navbar"
import FavoriteRecipes from "@/components/FavoriteRecipes"
import Footer from "@/components/Footer"

export default function ProfilePage() {
    const { id } = useParams()

    const {data: session, status} = useSession()

    if(status === "loading"){
        return <p>Loading...</p>
    }

    return (
        <div className="bg-customYellow min-h-screen">
            <div className="sticky top-0 bg-customYellow z-50 mb-20">
                <Navbar />
            </div>
            
            <div className="mx-44 mb-20">
                <div className="mb-28">
                    <UserProfile userId={id} />
                </div>
                
                <div>
                    <h1 className="font-serif text-[40px] text-customDarkGreen">Favorite Recipes</h1>
                    <FavoriteRecipes userId={id}/>
                </div>
            </div>

            <Footer />
            
            
        </div>
    )
}
