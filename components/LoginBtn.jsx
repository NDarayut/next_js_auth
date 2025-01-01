import Link from "next/link";

export default function LoginBtn(){
    return( 
        <Link href={"/login"}>
            <button className="generalButton text-white" type="button">Login/Sign up</button>
        </Link>
    )
}