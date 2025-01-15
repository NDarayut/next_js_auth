"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import LogoutBtn from "./LogoutBtn";
import DeleteBtn from "./DeleteButton";
import Image from "next/image";

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
            } 
            catch (error) {
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
                method: "PUT",
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
        } 
        
        catch (error) {
            console.error("Error saving changes:", error);
            setError("An unexpected error occurred");
        }
    };

    const handleCancelChanges = () => {
        setFormData({ firstName: user.firstName, 
                        lastName: user.lastName, 
                        profilePicture: user.profilePicture,
                     });
    };

    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (status === "loading" || !user){
        return <div>Loading...</div>
    }

    return (
        <div className="mx-[100px]">
            <div className="flex flex-row gap-80 justify-center">

                {/*Profile picture container */}
                <div>
                    {/*Determine if the current user is the owner of the profile page */}
                    {isOwner ? (
                    <>
                        <div
                            className="relative group w-72 h-72 mt-4 cursor-pointer"
                            onClick={() => fileInputRef.current?.click()} // Trigger file input on click
                        >
                            {/*If the profile picture exist, display it, if not, show a text*/}
                            {formData.profilePicture ? (
                                <Image 
                                    src={formData.profilePicture}
                                    alt="Profile Preview"
                                    width={0}
                                    height={0}
                                    className="rounded-full"
                                    style={{ width: '100%', height: '100%' }}

                                />
                            ) : (
                            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                <p>Upload Picture</p>
                            </div>
                            )}

                            {/* Hover Camera Icon */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <Image
                                    src="/upload.png"
                                    alt="Upload"
                                    width={48}
                                    height={48}
                                />
                            </div>
                        </div>

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            ref={fileInputRef} // Attach the ref here
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </>
                        ) : null}

                    <div className="flex flex-row mt-10 gap-2">
                        <div>
                            {isOwner && <LogoutBtn />}
                        </div>
                        <div>
                            {isOwner && <DeleteBtn />}
                        </div>
                    </div>
                    
                     
                </div>

                {/*Name and email container*/}
                <div className="flex flex-col gap-6 items-center">
                    <div>
                        <h2>First name</h2>
                        {isOwner ? (
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="border border-customDarkGreen rounded-[10px] p-2 mr-2 w-[429px] bg-customYellow"
                            />
                        ) : (
                            <p className="w-[429px]">{user.firstName}</p>
                        )}
                    </div>

                    <div>
                        <h2>Last name</h2>
                        {isOwner ? (
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="border border-customDarkGreen rounded-[10px] p-2 w-[429px] bg-customYellow"
                            />
                        ) : (
                            <p className="w-[429px]">{user.lastName}</p>
                        )}
                    </div>
                    
                    <div>
                        {isOwner && (
                            <div className="mt-4">
                                <button
                                    onClick={handleSaveChanges}
                                    className="p-2 bg-customGreen text-white rounded-[10px] w-48 hover:bg-[#4E8A5A] active:bg-[#335C3D]"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelChanges}
                                    className="ml-2 p-2  text-customDarkGreen rounded-[10px] border-customDarkGreen border-1 w-48 hover:text-white hover:bg-customGreen"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div> 
            </div>

            {isSuccess && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-customGreen text-white px-4 py-2 rounded-md shadow-lg z-50">
                    Update Successful!
                </div>
            )}
        </div>
    );
}
