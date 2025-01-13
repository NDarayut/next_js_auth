import { connectMongoDB } from "@/lib/mongodb" // importing the object we wrote in lib folder
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import User from "@/models/user"

export async function POST(req) {
    try{
        // destructuring the response to get only necessary data
        // await keyword pause the program and wait for the code to run before moving to next line
        const {firstName, lastName, email, password, role = "user", profilePicture = ""} = await req.json() // get the request sent from the RegisterForm and store it in the var
        const hashedPassword = await bcrypt.hash(password, 10) // pass in string that needed to be hased and number of hashing (10 round)

        // connect to database
        await connectMongoDB()
     
        await User.create({firstName, 
                            lastName, 
                            email, 
                            password: hashedPassword,
                            role,
                            profilePicture}) // input the detail into database

        return NextResponse.json({message: "User registered"}, {status:201}) // send response to confirm success
    }   
    catch (error){
        return NextResponse.json({message: "An error occured while registering the user"}, {status: 500})

    }
}