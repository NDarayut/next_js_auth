"use client"
import { useSession } from "next-auth/react";  // Import necessary hooks and signOut method
import { useRouter } from 'next/navigation'; // For client-side redirects
import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import PopularCard from "./components/PopularRecipe";

export default function Dashboard(){

    const { data: session, status } = useSession(); 
    const router = useRouter();
    const [popularRecipes, setPopularRecipes] = useState([])

    const [stats, setStats] = useState({
      usersCount: 0,
      recipesCount: 0,
      reviewsCount: 0,
    });

    // Check user role
  const role = session?.user?.role;


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect unauthenticated users to the login page
    } 
    
    else if (status === "authenticated" && role !== "admin") {
      router.push("/"); // Redirect non-admin users to an unauthorized page
    }
  }, [status, role, router]);
    
    // Fetch stats
    useEffect(() => {

      const fetchStats = async () => {
        try {
          const response = await fetch('/api/stats');
          if (!response.ok) throw new Error("Failed to fetch stats");
          const data = await response.json();
          setStats(data);
        } 
        
        catch (error) {
          console.error(error);
        }
      };

      // Fetch related recipe
      async function fetchPopularRecipes() {
        const response = await fetch('/api/recipes/popular')
        const data = await response.json()
        console.log(data)
        setPopularRecipes(data)
      }

      fetchStats();
      fetchPopularRecipes()
    }, []);


     // Show a loading state while session info is being retrieved
    if (status === "loading") {
      return <div>Loading...</div>;
    }

    // if it is admin, show this
    return(
        <>
        {/* Main Container */}
        <div className="flex min-h-screen">

          {/* Sidebar */}
          <SideBar />

          {/* Main Content */}
          <main className="flex-1 p-8 bg-customYellow">

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
                <h3 className="text-lg font-bold">{stats.recipesCount}</h3>
                <p>Total Recipes</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold">{stats.usersCount}</h3>
                <p>Users Registered</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold">{stats.reviewsCount}</h3>
                <p>Total Comments</p>
              </div>
            </section>

            {/* Customer Reviews */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-4 px-8">Popular Recipes (20)</h3>
              <div id="reviews" className="relative">
                <div className="flex items-center">
                  <div className="px-8 overflow-y-auto w-full max-h-[700px] grid grid-cols-1 gap-x-6 gap-y-8" style={{ scrollBehavior: "smooth" }}>
                    {popularRecipes.length > 0 ? (
                      popularRecipes.map((recipe) => (
                        <PopularCard
                          key={recipe._id}
                          recipeId={recipe._id}
                          src={recipe.image} 
                          title={recipe.title} 
                          rating={recipe.score} />
                      ))
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </>

    )
}


