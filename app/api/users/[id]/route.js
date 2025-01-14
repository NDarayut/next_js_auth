import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;

    try {
        await connectMongoDB();

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "An internal server error occurred" },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { firstName, lastName, email, profilePicture } = await req.json(); // Retrieve updated data

    try {
        await connectMongoDB();

        // Find the user by ID and update their details, including the profile picture if provided
        const updateFields = { firstName, lastName, email };

        if (profilePicture) {
            updateFields.profilePicture = profilePicture; // Only update profile picture if provided
        }

        const user = await User.findByIdAndUpdate(id, updateFields, { new: true });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { error: "An internal server error occurred" },
            { status: 500 }
        );
    }
}
