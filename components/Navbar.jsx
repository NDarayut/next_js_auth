import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import LoginBtn from './LoginBtn';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [profilePicture, setProfilePicture] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Fetch user profile picture
    if (session?.user?.id) {
      const fetchUser = async () => {
        try {
          const userId = session.user.id;
          const response = await fetch(`/api/users/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setProfilePicture(data.profilePicture || "");
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      fetchUser();
    }
  }, [session]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Hide Navbar when scrolling down, show when scrolling up
      if (currentScrollPos > lastScrollPos && currentScrollPos > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPos]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center px-28 h-20 bg-customYellow font-sans drop-shadow-lg">
        {/* Logo Section */}
        <div className="text-5xl mr-20 font-itim text-customGreen">
          <Link href="#">Bites</Link>
        </div>

        {/* Links Section */}
        <div className="space-x-[45px] text-[14px] mx-14 text-customDarkGreen font-medium">
          <Link href="/" className="hover:text-[#4E8A5A]">
            HOME
          </Link>
          <Link href="/about" className="hover:text-[#4E8A5A]">
            ABOUT US
          </Link>
          <Link href="/categories" className="hover:text-[#4E8A5A]">
            CATEGORIES
          </Link>
          <Link href="/contact" className="hover:text-[#4E8A5A]">
            CONTACT US
          </Link>
        </div>

        {/* Conditionally Render SearchBar */}
        {pathname !== "/" && (
          <div className="ml-auto mr-4">
            <SearchBar />
          </div>
        )}

        {status === "unauthenticated" ? (
          <div className="flex flex-1 justify-end">
            <LoginBtn />
          </div>
          
        ) : null}

        {/* Avatar Section */}
        {status === "authenticated" && session?.user && (
          <div className="flex items-center ml-auto mr-4 gap-4">
            <div>
              <Link href="/recipes/create">
                <img src="/create.png " className="w-8 h-8" />
              </Link>
            </div>
            <Link href={`/profile/${session.user.id}`}>
              <img
                src={profilePicture || "/default-avatar.png"}
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
