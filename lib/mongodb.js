import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();

export const connectMongoDB = async () => {
    
    // connecting to MongoDB with the connection string stored in .env file
    try{

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB")
    }
    catch (error){
        console.log("Error connecting to MongoDB", error)
    }
}
