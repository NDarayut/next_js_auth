import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        // Custom authentication
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email }); // Find mathcing email from Database

                    // Login fail if email is not found
                    if (!user) {
                        return null;
                    }
                    
                    // Compare password from database to the one user input
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        return null;
                    }

                    // Return user information once logged in
                    return {
                        id: user._id.toString(),  // Store MongoDB _id as the id
                        email: user.email,
                        role: user.role,
                        firstName: user.firstName,  // Add firstName and lastName
                        lastName: user.lastName,
                    };
                } 
                
                catch (error) {
                    console.log("Authorization error:", error);
                    return null;
                }
            }
        }),

        // Google OAuth (Google authentication)
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

    ],

    session: {
        strategy: "jwt",
    },

    // Callback in NextAuth are function that run differently during different phase of authentication flow
    callbacks: {

        // This callback trigger when user is login with google or custom
        async signIn({ user, account}) {
            console.log("SignIn User:", user);  // Log the user object to ensure it's correct

            try {
                await connectMongoDB();

                // Check if the user already exists in the database using the email
                let existingUser = await User.findOne({ email: user.email });

                // If the user dont exist we create the user
                if (!existingUser) {
                    // Split the full name into firstName and lastName
                    let firstName = "No Name";
                    let lastName = "No Name";

                    // If the user logs in via Google, use the full name from Google to set firstName and lastName
                    if (account.provider === 'google' && user.name) {
                        const nameParts = user.name.split(" ");
                        firstName = nameParts[0];
                        lastName = nameParts.slice(1).join(" ");
                    }

                    // Create a new user if they don't exist, use MongoDB generated _id
                    const newUser = new User({
                        firstName,
                        lastName,
                        email: user.email,
                        profilePicture: user.image || "", // Use profile picture from Google/Facebook
                        role: "user", // Assign a default role
                    });

                    await newUser.save();
                    // Set the user's _id in the JWT
                    user.id = newUser._id.toString();
                } 

                else {
                    // If user exists, ensure profile picture is updated
                    if (user.image && !existingUser.profilePicture) {
                        existingUser.profilePicture = user.image;
                        await existingUser.save();
                    }

                    // Set the user's _id in the JWT
                    user.id = existingUser._id.toString();
                    user.firstName = existingUser.firstName;
                    user.lastName = existingUser.lastName;
                }

                // Ensure that if firstName and lastName are undefined, username is derived from name
                if (!user.firstName || !user.lastName) {
                    user.username = user.name; // Fallback to the full name from Google
                } 
                
                else {
                    user.username = `${user.firstName} ${user.lastName}`;
                }

                return true; // Allow sign-in
            } 
            
            catch (error) {
                console.error("Error during sign-in callback:", error);
                return false; // Deny sign-in on error
            }
        },

        // JWT callback are used to modify or add custom field to the JWT.
        // JWT are token stored in the client side and used for authentication
        async jwt({ token, user }) {
            // When user logged in, this function takes data from the "user" object and add it to the token
            // The token will include all the information below.
            // The token allow for efficient access without having to query the user's info all the time
            if (user) {
                token.id = user.id;  // Set the MongoDB _id from the user object
                token.email = user.email;
                token.role = user.role || "user";
                token.username = user.username;  // Store the username in the JWT token
            }

            return token;
        },

        // Session callback is used to pass data from the JWT into the session object which is accesible
        // on the client side
        async session({ session, token }) {
            if (token) {
                console.log("Session Callback Token:", token);  // Log the token here
                session.user.id = token.id;  // Use the MongoDB _id stored in the token
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.username = token.username;  // Set the username in the session
            }
            console.log("Session in next auth: ", session);

            // Session is returned and can used by useSession() hook to access
            return session;
        }
    },

    // Key to hash the JWT
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/",
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
