"use client"; // This is required for client-side hooks like useSession

import { useSession, signOut } from "next-auth/react";

export default function DeleteBtn() {
  
  const { data: session } = useSession();

  if (!session) return null; // Don't render if user is not logged in

  return (
    <button className="bg-customGreen text-white font-semibold px-6 py-2 mt-3 rounded-[10px] hover:bg-[#4E8A5A]">
        Delete account
    </button>
  );
}
