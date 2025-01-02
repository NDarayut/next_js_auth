"use client"

import { useParams } from "next/navigation"
import UserProfile from "@/app/profile/[id]/components/UserProfile"
import { useSession } from "next-auth/react"
import Navbar from "@/components/Navbar"
import FavoriteRecipes from "@/app/profile/[id]/components/FavoriteRecipes"
import Footer from "@/components/Footer"
import UserCreatedRecipes from "./components/UserCreatedRecipes"

export default function ProfilePage() {
    const { id } = useParams()

    const {data: status} = useSession()

    if(status === "loading"){
        return <p>Loading...</p>
    }
    
    return (
        <div className="bg-customYellow min-h-screen">
            <div className="sticky top-0 bg-customYellow z-50 mb-36">
                <Navbar />
            </div>
            
            <div className="mx-44 mb-20">
                <div className="mb-28">
                    <UserProfile userId={id} />
                </div>
                
                <div className="mb-28">
                    <h1 className="font-serif text-[40px] text-customDarkGreen">Favorite Recipes</h1>
                    <FavoriteRecipes userId={id}/>
                </div>

                <div>
                    <h1 className="font-serif text-[40px] text-customDarkGreen">Your Recipes</h1>
                    <UserCreatedRecipes userId={id}/>
                </div>
            </div>

            <Footer />
            
            
        </div>
    )
}
