import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs"

export const authOptions = {
    providers: [
        
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials){
                const { email, password } = credentials
                try{
                    await connectMongoDB()
                    const user = await User.findOne({email})

                    if(!user){
                        return null
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(!passwordMatch){
                        return null
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        role: user.role,
                    }

                }
                catch (error){
                    console.log("Authorization error:", error)
                    return null

                }
            }

        }),
        // Gmail (Google OAuth)
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

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
            try {
              await connectMongoDB();
      
              // Check if the user already exists
              let existingUser = await User.findOne({ email: user.email });
      
              if (!existingUser) {
                // If user doesn't exist, create a new user with default role
                const newUser = new User({
                  name: user.name || "No Name", // Google provides name
                  email: user.email,
                  image: user.image || "", // Google profile picture
                  role: "user", // Assign a default role
                });
      
                await newUser.save();
              }
      
              return true; // Allow sign-in
            } catch (error) {
              console.error("Error during sign-in callback:", error);
              return false; // Deny sign-in on error
            }
          },
      
        async jwt({token, user}){
            if (user){
                token.id = user.id;
                token.email = user.email;
                token.role = user.role || "user";
            }

            return token;
        },

        async session({session, token}){
            if(token){
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.role = token.role;
            }
            console.log("Session in next auth: ", session)
            return session;
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },

}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}