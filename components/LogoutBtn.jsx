"use client"; // This is required for client-side hooks like useSession

import { useSession, signOut } from "next-auth/react";

export default function LogoutBtn() {
  
  const { data: session } = useSession();

  if (!session) return null; // Don't render if user is not logged in

  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-customYellow text-customDarkGreen font-semibold px-6 py-2 mt-3 border-1 border-dashed border-customDarkGreen rounded-[10px] hover:bg-customGreen hover:text-white"
    >
      Log out
    </button>
  );
}
