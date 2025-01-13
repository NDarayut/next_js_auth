"use client"
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import useRouter for dynamic routing

export default function SideBar() {

  const pathname = usePathname(); // Access the current route

  // Function to check if the route matches the current path
  const isActive = (path) => pathname === path;

  return (
    <aside className="w-1/5 bg-customBrown p-6 border-r r sticky top-0 h-screen overflow-y-auto">
      <h1 className="text-5xl mr-20 font-itim text-customGreen mb-10">Bites</h1>
      <nav>
        <ul className="space-y-4">

          {/*Navigate to main dashboard*/}
          <li>
            <a
              href="/admin/dashboard"
              className={`flex items-center text-customDarkGreen font-semibold h-12 p-3 ${
                  isActive("/admin/dashboard") ? "bg-customLightBrown rounded-lg" : "hover:bg-customLightBrown transition-colors duration-300 rounded-lg"
                }`}
            >
              <span className="mr-2">
                <Image 
                  src="/dashboard.png"
                  alt="dahsboard"
                  width={20}
                  height={20}
                />
              </span>
              Dashboard
            </a>
          </li>

          <li>
            <a
              href="/admin/dashboard/pending-recipe"
              className={`flex items-center text-customDarkGreen font-semibold h-12 p-3 ${
                isActive("/admin/dashboard/pending-recipe") ? "bg-customLightBrown rounded-lg" : "hover:bg-customLightBrown transition-colors duration-300 rounded-lg"
              }`}
            >
              <span className="mr-2">
                <Image 
                  src="/timer.png"
                  alt="dahsboard"
                  width={20}
                  height={20}
                />
              </span>
              Pending Approval
            </a>
          </li>
          
          {/*Navigate to comment dashbaord*/}
          <li>
            <a 
              href="/admin/dashboard/comments" 
              className={`flex items-center text-customDarkGreen font-semibold h-12 p-3 ${
                isActive("/admin/dashboard/comments") ? "bg-customLightBrown rounded-lg" : "hover:bg-customLightBrown transition-colors duration-300 rounded-lg"
              }`}
            >
              <span className="mr-2">
                <Image 
                  src="/comment.png"
                  alt="dahsboard"
                  width={20}
                  height={20}
                />
              </span>
              Comments
            </a>
          </li>

          {/*Navigate to creater recipe*/}
          <li>
            <a 
              href="/admin/dashboard/create-recipe" 
              className={`flex items-center text-customDarkGreen font-semibold h-12 p-3 ${
                isActive("/admin/dashboard/create-recipe") ? "bg-customLightBrown rounded-lg" : "hover:bg-customLightBrown transition-colors duration-300 rounded-lg"
              }`}
            >
              <span className="mr-2">
                <Image 
                  src="/create.png"
                  alt="dahsboard"
                  width={18}
                  height={18}
                />
              </span>
              Create Recipe
            </a>
          </li>

          {/*Navigate to recipe dashboard*/}
          <li>
            <a 
              href="/admin/dashboard/recipes" 
              className={`flex items-center text-customDarkGreen font-semibold h-12 p-3 ${
                isActive("/admin/dashboard/recipes") ? "bg-customLightBrown rounded-lg" : "hover:bg-customLightBrown transition-colors duration-300 rounded-lg"
              }`}
            >
              <span className="mr-2">
                <Image 
                  src="/cook.png"
                  alt="dahsboard"
                  width={25}
                  height={25}
                />
              </span>
              Recipes
            </a>
          </li>

          {/*Navigate to categories dashboard*/}
          <li>
            <a 
              href="/admin/dashboard/categories" 
              className={`flex items-center text-customDarkGreen font-semibold h-12 p-3 ${
                isActive("/admin/dashboard/categories") ? "bg-customLightBrown rounded-lg" : "hover:bg-customLightBrown transition-colors duration-300 rounded-lg"
              }`}
            >
              <span className="mr-2">
                <Image 
                  src="/categories.png"
                  alt="categories"
                  width={20}
                  height={20}
                />
              </span>
              Categories
            </a>
          </li>

          {/*Navigate to users dashboard*/}
          <li>
            <a 
              href="/admin/dashboard/users" 
              className={`flex items-center text-customDarkGreen font-semibold h-12 p-3 ${
                isActive("/admin/dashboard/users") ? "bg-customLightBrown rounded-lg" : "hover:bg-customLightBrown transition-colors duration-300 rounded-lg"
              }`}
            >
              <span className="mr-2">
                <Image 
                  src="/user.png"
                  alt="users"
                  width={20}
                  height={20}
                />
              </span>
              Users
            </a>
          </li>

          {/* Button to navigate to the homepage */}
          <li className="absolute bottom-5 left-0 w-full px-4">
            <a
              href="/"
              className="flex items-center text-customDarkGreen font-semibold h-12 p-3 hover:bg-customLightBrown transition-colors duration-300 rounded-lg"
            >
              <span className="mr-2">
                <Image
                  src="/exit.png" // Choose an appropriate home icon
                  alt="Home"
                  width={20}
                  height={20}
                />
              </span>
              Exit
            </a>
          </li>

        </ul>
      </nav>
    </aside>
  )
}