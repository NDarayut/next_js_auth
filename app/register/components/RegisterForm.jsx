"use client";

import Link from "next/link";
import { useState } from "react";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterForm(){

    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")
    const[error, setError] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        // check for missing value
        if(!firstName || !lastName || !email || !password || !confirmPassword){
            setError("All fields are necessary")
            return
        }

        // check if passworkd is at least 8 characters
        if(password.length < 8){
            setError("Password at least 8 characters please!")
            return
        }

        // check if the password and the confirmed password are the same
        if(password != confirmPassword){
            setError("Password and Confirmed Password must be the same")
            return
        }
        
        try{

            // we pass the email from the input field to an API
            // if the email exist in the database, it will return an id
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email}),
            })

            // destructure the response and only getting the user's ID
            const {id} = await resUserExists.json()

            // if ID is valid, it means that the email is taken
            if(id){
                setError("User already exist")
                return
            }

            // This code send the data of user into the endpoint and the endpoint stores the data into a database
            // after the data is stored, the endpoint will send a response back to the "res" variable
            // the response from the API is stored in "res"
            const res = await fetch("api/register", { // send HTTP request to endpoint "/api/register"
                method: "POST", // specify the type of HTTP request being made
                headers: {
                    "Content-Type": "application/json" // tells the server that the data send sent is JSON type
                },
                body: JSON.stringify({ // body contain the actual data
                    firstName,
                    lastName,
                    email,
                    password
                }),
            })

            // if the res status code is between 200-299 then it is successful
            if(res.ok){
                // clear the fields once registeration is successful
                const form = e.target
                form.reset();
                setError("") // clear the error
                router.push("/login") // redirect user to login page but they can still go back to register with back button
            }
            
            else{
                console.log("Registeration failed")
            }
        }
        catch(error) {
            console.log("Error during registeration: ", error)
        }
    }

    return(
        <div className="grid place-items-center h-screen bg-[url('/auth_page.jpg')] bg-cover bg-center" >
            <div className="flex flex-col items-center border-[1px] border-black p-5 rounded-[30px] bg-customYellow w-[455px]">

                <div className="flex flex-col justify-center items-center w-[300px] mb-[20px]">
                    <h1 className="text-[60px] font-bold font-jura my-1 text-customGreen">Sign up</h1>
                    <h2 className="text-[20px] font-jura text-center">Enter the details to get sign up to your account</h2>
                </div>
                

                <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">

                    <div className="flex flex-row w-[400px] gap-[10px]">
                        <input onChange={(e) => setFirstName(e.target.value)} 
                            className="username" type="text" placeholder="First name" />

                        <input onChange={(e) => setLastName(e.target.value)}
                             className="username" type="text" placeholder="Last name" />
                    </div>
                    
                    <input onChange={(e) => setEmail(e.target.value)}
                            className="email" type="email" placeholder="Enter email" />
                    <input onChange={(e) => setPassword(e.target.value)}
                            className="password" type="password" placeholder="Enter password" />
                    <input onChange={(e) => setConfirmPassword(e.target.value)}
                            className="password" type="password" placeholder="Confirm password" />

                    <div className="flex flex-col items-center gap-3">

                        {/* check if the "error" value is true, if it is, then display the error below */}
                        { error && (
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                {error} {/*Display whatever error is thrown into the error state variable */}
                            </div>
                            )
                        }

                        <button className="signupButton" type="submit">Sign up</button>
                    </div>

                    <div className="items-center flex justify-center">
                        <hr className="border-gray-400 w-1/4 mr-[10px]" />
                        <span className="font-jura text-[14px]">or sign up with</span>
                        <hr className="border-gray-400 w-1/4 ml-[10px]"/>
                    </div>

                </form>

                <div className="flex justify-center gap-[25px] mt-[20px]">
                        <button className="google" onClick={() => signIn("google")}>
                            <Image 
                                src="/google.ico"
                                alt="Google login"
                                width={16}
                                height={16}
                                className="mr-[10px]"
                            />
                            Gmail
                        </button>
                        {/*<button className="facebook"><img src="/facebook.ico" className="w-6 h-6 mr-[5px]" />Facebook</button>*/}
                         {/*<button className="instagram"><img src="/instagram.ico" className="w-6 h-6" />Instagram</button>*/}
                </div>

                <Link className="text-[15px] mt-3 flex flex-col text-center gap-[10px] font-jura" href={"/login"}>
                    <span>Have an account? </span>
                    <span className="underline font-bold hover:text-gray-400 active:text-gray-950 font-jura">Login now!</span>
                </Link>

            </div>
        </div>
    )
}