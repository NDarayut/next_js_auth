import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

/*
    This API will fetch the user's information based on their userID to display them on their profile
*/
export async function GET(req, { params }) {
    const { id } = params;

    try {
        await connectMongoDB();

        const user = await User.findById(id);

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture,
        }), {status: 200});
    } catch (error) {

        return new Response(JSON.stringify({ error: "An internal server error occurred" }),
            { status: 500 }
        );
    }
}

/*
    This API will update any changes made by the user on their profile
*/
export async function PUT(req, { params }) {
    const { id } = params;
    const { firstName, lastName, email, profilePicture } = await req.json(); // Retrieve updated data

    try {
        await connectMongoDB();

        // Find the user by ID and update their details, including the profile picture if provided
        const updateFields = { firstName, lastName};

        if (profilePicture) {
            updateFields.profilePicture = profilePicture; // Only update profile picture if provided
        }

        const user = await User.findByIdAndUpdate(id, updateFields, { new: true });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePicture: user.profilePicture,
        }), {status: 200});
    } 
    
    catch (error) {
        return new Response(JSON.stringify({ error: "An internal server error occurred" }),
            { status: 500 }
        );
    }
}
