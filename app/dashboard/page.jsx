"use client"

import { useSession, signOut } from "next-auth/react";  // Import necessary hooks and signOut method
import { useRouter } from 'next/navigation'; // For client-side redirects

export default function Dashboard(){

    const { data: session, status } = useSession(); // Fetch session using useSession hook
    const router = useRouter();
  

    // If session is still loading, you can return a loading state
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    // Check if the user is not authenticated or not an admin
    if (!session || session.user.role !== "admin") {
        router.push("/"); // Redirect to home or login page if not authenticated or not admin
        return null;
    }
    
    console.log(session)
    // if it is admin, show this
    return(
        <div>
            <h1>This is a dashboard</h1>
            <button
                onClick={() => signOut({ callbackUrl: '/login' })}  // Logs the user out and redirects to login page
                className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
                Log out
            </button>
        </div>
    )
}