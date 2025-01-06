"use client";

import Link from "next/link";
import { useState } from "react";
import {signIn, getSession} from "next-auth/react"
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginForm(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
     const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const res = await signIn("credentials", {
                email, 
                password, 
                redirect: false
            })


            if (res.error){
                setError("Invalid credential")
                return
            }
            
            const session = await getSession()

            if (session?.user?.role === "admin") {
                router.replace("/admin/dashboard"); // Redirect to admin dashboard
            } 
              
            else if (session?.user?.role === "user") {
                router.replace("/"); // Redirect to user homepage
            } 


            

        }
        catch (error){
            console.log(error)
        }
    }

    const handleGoogleLogin = async (e) => {
        e.preventDefault()

        try{
            // Handle Google Login
            const result = await signIn("google", {
                callbackUrl: "/", // Redirect to this page after login
            });
        
            if (result.error) {
                console.error("Google login failed:", result.error);
            }

        }
        catch (error){
            console.log(error)
        }
    }

    return(
        <div className="grid place-items-center h-screen bg-[url('/auth_page.jpg')] bg-cover bg-center" >
            <div className="flex flex-col items-center border-[1px] border-black p-5 rounded-[30px] bg-customYellow w-[455px]">

                <div className="flex flex-col justify-center items-center w-[300px] mb-[20px]">
                    <h1 className="text-[60px] font-bold font-jura my-1 text-customGreen">Login</h1>
                    <h2 className="text-[20px] font-jura text-center">Enter the details to get login to your account</h2>
                </div>
                

                <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
                    <input onChange={(e) => setEmail(e.target.value)} 
                            className="email" type="email" placeholder="Enter email" />

                    <input onChange={(e) => setPassword(e.target.value)}
                            className="password" type="password" placeholder="Enter password" />

                    <div className="flex flex-col items-center gap-3">

                        {/* check if the "error" value is true, if it is, then display the error below */}
                        { error && (
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 font-mono">
                                {error} {/*Display whatever error is thrown into the error state variable */}
                            </div>
                            )
                        }
                        <button className="loginButton" type="submit">Login</button>
                    </div>

                    <div className="items-center flex justify-center">
                        <hr className="border-gray-400 w-1/4 mr-[10px]" />
                        <span className="font-jura text-[14px]">or login with</span>
                        <hr className="border-gray-400 w-1/4 ml-[10px]" />
                    </div>

                    
                </form>

                <div className="flex justify-center gap-[25px] mt-[20px] font-jura">
                        <button className="google" onClick={handleGoogleLogin}>
                            <Image 
                                src="/google.ico"
                                alt="Google login"
                                width={16}
                                height={16}
                                className="mr-[10px]"
                            />
                            Gmail
                        </button>
                </div>
                
                <Link className="text-[15px] mt-3 flex flex-col text-center gap-[10px] font-mono" href={"/register"}>
                    <span>Don&apos;t have an account?</span> 
                    <span className="underline font-bold hover:text-gray-400 active:text-gray-950">Sign up now!</span>
                </Link>

            </div>
        </div>
    )
}