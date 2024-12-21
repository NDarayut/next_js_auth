import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function GET(req, {params}){
    const {id} = params

    try{
        await connectMongoDB()

        const user = await User.findById(id)

        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        return NextResponse.json({
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture

        })
    }

    catch(error){
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "An internal server error occurred" },
            { status: 500 }
        );
    }
}

export async function PATCH(req, { params }) {
    const { id } = params
    const { firstName, lastName } = await req.json() // Retrieve updated data from request body

    try {
        await connectMongoDB()

        // Find the user by ID and update their name
        const user = await User.findByIdAndUpdate(
            id,
            { firstName, lastName },
            { new: true } // Return the updated document
        )

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture
        })
    }
    catch (error) {
        console.error("Error updating user:", error)
        return NextResponse.json(
            { error: "An internal server error occurred" },
            { status: 500 }
        )
    }
}