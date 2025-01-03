"use client"
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import useRouter for dynamic routing

export default function SideBar() {

  const pathname = usePathname(); // Access the current route

  // Function to check if the route matches the current path
  const isActive = (path) => pathname === path;

  return <aside className="w-1/5 bg-customBrown p-6 border-r">
    <h1 className="text-5xl mr-20 font-itim text-customGreen mb-10">Bites</h1>
    <nav>
      <ul className="space-y-4">

        {/*Navigate to main dashboard*/}
        <li>
          <a
            href="/admin/dashboard"
            className={`flex items-center text-customDarkGreen font-semibold h-12 p-3 ${
                isActive("/admin/dashboard") ? "bg-customDarkBrown rounded-lg" : "hover:bg-customDarkBrown transition-colors duration-300 rounded-lg"
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
              isActive("/admin/dashboard/pending-recipe") ? "bg-customDarkBrown rounded-lg" : "hover:bg-customDarkBrown transition-colors duration-300 rounded-lg"
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
              isActive("/admin/dashboard/comments") ? "bg-customDarkBrown rounded-lg" : "hover:bg-customDarkBrown transition-colors duration-300 rounded-lg"
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

        <li>
          <a 
            href="/admin/dashboard/create-recipe" 
            className={`flex items-center text-customDarkGreen font-semibold h-12 p-3 ${
              isActive("/admin/dashboard/create-recipe") ? "bg-customDarkBrown rounded-lg" : "hover:bg-customDarkBrown transition-colors duration-300 rounded-lg"
            }`}
          >
            <span className="mr-2">
              <Image 
                src="/create.png"
                alt="dahsboard"
                width={20}
                height={20}
              />
            </span>
            Create Recipe
          </a>
        </li>

      </ul>
    </nav>
  </aside>;
}