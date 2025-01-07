import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import LoginBtn from './LoginBtn';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [profilePicture, setProfilePicture] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [categories, setCategories] = useState([]); // Store fetched categories
  const [dropdownVisible, setDropdownVisible] = useState(false); // Control dropdown visibility
  const pathname = usePathname();

  // Unslugify function
  function unslugify(slug) {
    return slug
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  }

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

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const dishTypesResponse = await fetch("/api/categories/dishtypes");
        const dishTypes = dishTypesResponse.ok ? await dishTypesResponse.json() : [];
        setCategories([...dishTypes]); //  dishTypes
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState); // Toggle dropdown visibility
  };

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
          <div className="relative inline-block">
            <button
              onClick={toggleDropdown} // Toggle the dropdown visibility
              className="hover:text-[#4E8A5A] focus:outline-none"
            >
              CATEGORIES
            </button>
            {dropdownVisible && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg border rounded w-48">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/categories/${category.name}`} 
                    className="block px-4 py-2 text-base text-customDarkGreen hover:bg-customLightBrown" 
                  >
                    {unslugify(category.name)}
                  </Link>
                ))}
              </div>
            )}
          </div>
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

        
        {status === "authenticated" && session?.user && (
          <div className="flex items-center ml-auto mr-4 gap-4">
            
            {/* Create recipe */}
            <Link href="/recipes/create">
              <Image 
                src="/create.png"
                alt="Create Recipe"
                width={0}
                height={0}
                className="w-8 h-8"
              />
            </Link>

            {/*Admin dashboard navigation */}
            {session?.user?.role === "admin" && (
              <Link href="/admin/dashboard">
                <Image 
                src="/admin.png"
                alt="admin navigation"
                width={0}
                height={0}
                className="w-8 h-8"
              />
              </Link>
            )}

            {/* Avatar Section */}
            <Link href={`/profile/${session.user.id}`}>
              <Image 
                src={profilePicture || "/default.png"}
                alt="User Avatar"
                width={0}
                height={0}
                className="w-12 h-12 rounded-full cursor-pointer border border-customDarkGreen"
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
