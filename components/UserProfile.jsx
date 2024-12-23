"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";

export default function UserProfile({ userId }) {
    const { data: session, status } = useSession();
    const [isOwner, setIsOwner] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        profilePicture: "",
    });

    const fileInputRef = useRef(null);

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`);
                if (!response.ok) {
                    const { error } = await response.json();
                    setError(error || "Failed to fetch user!");
                    return;
                }
                const data = await response.json();
                setUser(data);

                if (session?.user?.id === userId) {
                    setIsOwner(true);
                    setFormData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        profilePicture: data.profilePicture || "", // Add this to handle profile picture
                    });
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setError("An unexpected error occurred");
            }
        };
        fetchUser();
    }, [userId, session?.user?.id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file input change (to convert the image to base64)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    profilePicture: reader.result, // Save base64 string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Save changes
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const { error } = await response.json();
                setError(error || "Failed to update user!");
                return;
            }

            setUser((prevUser) => ({ ...prevUser, ...formData }));
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
        } catch (error) {
            console.error("Error saving changes:", error);
            setError("An unexpected error occurred");
        }
    };

    const handleCancelChanges = () => {
        setFormData({ firstName: user.firstName, lastName: user.lastName, profilePicture: user.profilePicture });
    };

    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (status === "loading" || !user) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">User Profile</h1>

            <div>
                <h2>First name</h2>
                {isOwner ? (
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="border rounded p-2 mr-2"
                    />
                ) : (
                    <p className="text-gray-700">{user.firstName}</p>
                )}

                <h2>Last name</h2>
                {isOwner ? (
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="border rounded p-2"
                    />
                ) : (
                    <p className="text-gray-700">{user.lastName}</p>
                )}

                <h2>Profile Picture</h2>
                {isOwner ? (
                    <>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="border rounded p-2 mr-2"
                        />
                        {formData.profilePicture && (
                            <img
                                src={formData.profilePicture}
                                alt="Profile Preview"
                                className="w-32 h-32 rounded-full object-cover mt-4"
                            />
                        )}
                    </>
                ) : (
                    user.profilePicture ? (
                        <img
                            src={user.profilePicture}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover mt-4"
                        />
                    ) : (
                        <p>No profile picture available</p>
                    )
                )}
            </div>

            {isOwner && (
                <div className="mt-4">
                    <button
                        onClick={handleSaveChanges}
                        className="p-2 bg-green-500 text-white rounded"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancelChanges}
                        className="ml-2 p-2 bg-gray-500 text-white rounded"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {isSuccess && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
                    Update Successful!
                </div>
            )}
        </div>
    );
}
