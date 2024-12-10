import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.js"; 
import { connectMongoDB } from "../lib/mongodb.js"; 

const seedAdmin = async () => {
    try {
        
        // Create the admin user
        const hashedPassword = await bcrypt.hash("admin123", 10); // Hash the password 10 times

        // Connect to the database
        await connectMongoDB();

        await User.create({firstName: "Admin",
            lastName: "User",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin",}) // input the detail into database

        // debug purpose
        console.log("Admin user created successfully.");
    } 
    catch (error) {
        console.error("Error seeding admin user:", error);
    } 
    finally {
        mongoose.connection.close(); // Close the database connection
    }
};

// Run the seeder
seedAdmin();
