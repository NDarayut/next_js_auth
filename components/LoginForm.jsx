"use client";

import Link from "next/link";
import { useState } from "react";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";

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
            
            router.replace("/") // redirect user to dashboard but they cant go back to login with back button

        }
        catch (error){
            console.log(error)
        }
    }
    return(
        <div className="grid place-items-center h-screen bg-[url('/auth_page.jpg')] bg-cover bg-center" >
            <div className="flex flex-col items-center border-[1px] border-black p-5 rounded-[30px] bg-customYellow w-[455px]">

                <div className="flex flex-col justify-center items-center w-[300px] mb-[20px]">
                    <h1 className="text-[60px] font-bold font-mono my-1 text-customGreen">Login</h1>
                    <h2 className="text-[20px] font-mono text-center">Enter the details to get login to your account</h2>
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
                        <span className="font-mono text-[14px]">or login with</span>
                        <hr className="border-gray-400 w-1/4 ml-[10px]" />
                    </div>

                    
                </form>

                <div className="flex justify-center gap-[25px] mt-[20px]">
                        <button className="google"><img src="/google.ico" className="w-4 h-4 mr-[10px]" />Gmail</button>
                        <button className="facebook"><img src="/facebook.ico" className="w-6 h-6 mr-[5px]" />Facebook</button>
                        <button className="instagram"><img src="/instagram.ico" className="w-6 h-6" />Instagram</button>
                </div>
                
                <Link className="text-[15px] mt-3 flex flex-col text-center gap-[10px] font-mono" href={"/register"}>
                    <span>Don't have an account?</span> 
                    <span className="underline font-bold hover:text-gray-400 active:text-gray-950">Sign up now!</span>
                </Link>

            </div>
        </div>
    )
}