import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
                    const user = await User.findOne({ email})

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

        })
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({token, user}){
            if (user){
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
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