"use client";
import { useState, useEffect } from "react";
import CommentBoard from "./components/CommentBoard";
import SideBar from "../../components/SideBar";

export default function AdminDashboard() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/recipes/comments');
        if (!response.ok) throw new Error("Failed to fetch comments");
        const data = await response.json();
        setComments(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  // Handle deletion of comment
  const handleDelete = async (commentId) => {
    try {
      const response = await fetch('/api/recipes/comments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete comment");
      }

      // Remove the deleted comment from the UI
      setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />

      <main className="flex-1 p-8">
        {/* Comment Review Section */}
        <CommentBoard loading={loading} comments={comments} handleDelete={handleDelete}/>
      </main>
      
    </div>
  );
}


