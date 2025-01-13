"use client"
import { useState, useEffect } from "react"
import UserCards from "./components/UserCards";
import SideBar from "../components/SideBar";
import { useSession } from "next-auth/react";

export default function UserDashboard (){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const { data: status } = useSession(); 

   // Function to fetch recipes
  const fetchUsers = async (page) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/users/getAllUsers?page=${page}&limit=20`);
      const data = await response.json();
      //console.log(data)
      if (response.ok) {
        if (page === 1) {
          // For the first page, replace the entire list
          setUsers(data);
          console.log(users)
        } 
        
        else {
          // For subsequent pages, append the data
          setUsers((prevUsers) => [...prevUsers, ...data]);
        }
      } 
      
      else {
        setError(data.error || "Failed to fetch recipes.");
      }
    } 
    
    catch (error) {
      console.error(error);
      setError("An error occurred while fetching recipes.");
    } 
    
    finally {
      setLoading(false);
    }
  };

  // Fetch recipes when the page loads
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // Load more recipes when the button is clicked
  const loadMoreUsers = () => {
    setPage((prevPage) => prevPage + 1); // Increase the page number to load the next set of recipes
  };
  
  if(status === "loading"){
    return <div>Loading...</div>
  }
    return (
      <div className="flex min-h-screen">
      <SideBar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6 text-customDarkGreen">Registered Users</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center p-4">
            <div className="text-lg font-medium">Loading users...</div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <UserCards
                key={user._id}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                createdAt={user.createdAt}
              />
            ))
          ) : (
            <div className="text-gray-600">No users found.</div>
          )}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMoreUsers}
            disabled={loading}
            className="generalButton text-white"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </main>
    </div>
    )
}