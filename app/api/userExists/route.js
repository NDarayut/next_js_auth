import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req){
    try{    
        // connect to mongoDB
        await connectMongoDB();
        // get the request (only the email) sent from RegisterForm
        const {email} = await req.json();

        const user = await User.findOne({email}).select("_id") // With the email, we find the id from the database

        console.log("user: ", user)

        return NextResponse.json({user}); // we pass the id back to the client
    }
    catch(error){
        console.log(error)
    }
}