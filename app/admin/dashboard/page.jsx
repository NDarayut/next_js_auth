"use client"

import { useSession, signOut } from "next-auth/react";  // Import necessary hooks and signOut method
import Image from "next/image";
import { useRouter } from 'next/navigation'; // For client-side redirects

export default function Dashboard(){

    const { data: session, status } = useSession(); // Fetch session using useSession hook
    const router = useRouter();
  

    // If session is still loading, you can return a loading state
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    // Check if the user is not authenticated or not an admin
    if (!session.user || session.user.role !== "admin") {
        router.push("/"); // Redirect to home or login page if not authenticated or not admin
        return null;
    }
    
    console.log(session)
    // if it is admin, show this
    return(
        <>
  {/* Main Container */}
  <div className="flex min-h-screen">

    {/* Sidebar */}
    <aside className="w-1/5 bg-white p-6 border-r">
      <h1 className="text-2xl font-bold mb-6">Bites</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <a
              href="./index.html"
              className="flex items-center text-green-500 font-semibold"
            >
              <span className="material-icons mr-2">
                <i className="fa-solid fa-house" />
              </span>
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="../public/pages/recipe.html"
              className="flex items-center text-gray-600"
            >
              <span className="material-icons mr-2">
                <i className="fa-solid fa-mug-hot" />
              </span>
              Recipes
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-600">
              <span className="material-icons mr-2">
                <i className="fa-solid fa-users" />
              </span>
              User
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-600">
              <span className="material-icons mr-2">
                <i className="fa-regular fa-pen-to-square" />
              </span>
              Reviews
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-8">

      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-4 py-2"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Filter
          </button>
        </div>
      </header>

      {/* Dashboard Stats */}
      <section className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold">5k</h3>
          <p>Total Recipes</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold">2k</h3>
          <p>Users Registered</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold">357</h3>
          <p>Total Reviews</p>
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Pie Chart</h3>
          <div className="flex justify-center items-center">
            [Insert Pie Chart]
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">User Registration Chart</h3>
          <div className="flex justify-center items-center">
            [Insert Line Chart]
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
        <div id="reviews" className="relative">
          <div className="flex items-center">
            <button
              id="prevReview"
              className="absolute left-0 text-gray-500 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            >
            </button>
            <div className="flex-1 flex overflow-hidden">
              <div className="review hidden flex flex-col items-center text-center flex-shrink-0 w-full">

                <Image 
                  src="../src/img/PFP-1.png"
                  alt="User"
                  width={64}
                  height={64}
                  className="rounded-full mb-4"
                />

                <h4 className="font-bold">John Sena</h4>
                <p>&quot;Excellent recipes! Highly recommended.&quot;</p>
              </div>
              <div className="review hidden flex flex-col items-center text-center flex-shrink-0 w-full">
                <Image 
                  src="../src/img/PFP-1.png"
                  alt="User"
                  width={64}
                  height={64}
                  className="rounded-full mb-4"
                />
                <h4 className="font-bold">Sofia</h4>
                <p>&quot;Great user experience and tasty dishes!&quot;</p>
              </div>
              <div className="review hidden flex flex-col items-center text-center flex-shrink-0 w-full">
                <Image 
                  src="../src/img/PFP-1.png"
                  alt="User"
                  width={64}
                  height={64}
                  className="rounded-full mb-4"
                />
                <h4 className="font-bold">Michael</h4>
                <p>&quot;Love the variety of recipes provided!&quot;</p>
              </div>
            </div>
            <button
              id="nextReview"
              className="absolute right-0 text-gray-500 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            >
              &gt;
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</>

    )
}