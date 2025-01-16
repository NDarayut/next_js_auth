import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

/*
    This API is used to send the email to the database and checking if the email existed
    IF the email existed, it will return an ID.
    The ID will be used to verify if the email has been registered as an account.
*/
export async function POST(req){
    try{    
        // connect to mongoDB
        await connectMongoDB();
        
        // get the request (only the email) sent from RegisterForm
        const {email} = await req.json();

        // With the email, we find the id from the database
        const id = await User.findOne({email}).select("_id") 

        return new Response(JSON.stringify({id}), {status: 200}); // we pass the id back to the client
    }

    catch(error){
        console.log(error)
    }
}