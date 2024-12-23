import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import LoginBtn from './LoginBtn';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userId = session.user.id
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setProfilePicture(data.profilePicture);
  };
  fetchUser();
  }, [session]);


  return (
    <nav>
      <div className="flex items-center border-b-[4px] border-customGreen px-8 h-20 mb-20"> {/* Ensures consistent height */}
        {/* Logo Section */}
        <div className="text-black font-jura text-[60px]">
          <Link href="/">Bites</Link>
        </div>

        {/* Links Section */}
        <div className="space-x-[45px] text-[25px] mx-14">
          <Link href="/" className="text-black font-itim hover:text-green-400 font-medium">
            Home
          </Link>
          <Link href="/about" className="text-black font-itim hover:text-green-400 font-medium">
            About us
          </Link>
          <Link href="/categories" className="text-black font-itim hover:text-green-400 font-medium">
            Categories
          </Link>
          <Link href="/contact" className="text-black font-itim hover:text-green-400 font-medium">
            Contact us
          </Link>
        </div>

        <div className="ml-auto mr-4">
          <SearchBar />
        </div>

        {status === "unauthenticated"? (
          <div className="flex justify-end">
            <LoginBtn />
          </div>
        ):(<p></p>)}

        {/* Avatar Section */}
        {status === "authenticated" && (
          <div className="flex items-center ml-auto mr-4"> {/* Flex alignment for vertical centering */}
            <Link href={`/profile/${session.user.id}`}>
              <img
                src={profilePicture} // User profile image or a default one
                alt="User Avatar"
                className="w-12 h-12 rounded-full cursor-pointer border border-customDarkGreen"
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
