"use client"

import { useParams } from "next/navigation"
import UserProfile from "@/components/UserProfile"
import LogoutBtn from "@/components/LogoutBtn"
import { useSession } from "next-auth/react"
import Navbar from "@/components/Navbar"

export default function ProfilePage() {
    const { id } = useParams()

    const {data: session, status} = useSession()

    if(status === "loading"){
        return <p>Loading...</p>
    }

    const isOwner = session?.user?.id === id;

    return (
        <div className="bg-customYellow min-h-screen">
            <Navbar />
            <UserProfile userId={id} />
            {isOwner && <LogoutBtn />}
        </div>
    )
}
