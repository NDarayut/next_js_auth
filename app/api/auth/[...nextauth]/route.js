import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),  // Store MongoDB _id as the id
                        email: user.email,
                        role: user.role,
                        firstName: user.firstName,  // Add firstName and lastName
                        lastName: user.lastName,
                    };
                } catch (error) {
                    console.log("Authorization error:", error);
                    return null;
                }
            }
        }),

        // Google OAuth
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // Facebook OAuth
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        })
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("SignIn User:", user);  // Log the user object to ensure it's correct

            try {
                await connectMongoDB();

                // Check if the user already exists in the database using the email
                let existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    // Split the full name into firstName and lastName
                    let firstName = "No Name";
                    let lastName = "No Name";

                    if (user.name) {
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

                // Combine firstName and lastName to create username
                user.username = `${user.firstName} ${user.lastName}`;

                return true; // Allow sign-in
            } catch (error) {
                console.error("Error during sign-in callback:", error);
                return false; // Deny sign-in on error
            }
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;  // Set the MongoDB _id from the user object
                token.email = user.email;
                token.role = user.role || "user";
                token.username = user.username;  // Store the username in the JWT token
            }
            console.log("JWT Callback User:", user);

            return token;
        },

        async session({ session, token }) {
            if (token) {
                console.log("Session Callback Token:", token);  // Log the token here
                session.user.id = token.id;  // Use the MongoDB _id stored in the token
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.username = token.username;  // Set the username in the session
            }
            console.log("Session in next auth: ", session);
            return session;
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
