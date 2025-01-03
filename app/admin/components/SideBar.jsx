export default function SideBar() {
    return <aside className="w-1/5 bg-white p-6 border-r">
      <h1 className="text-2xl font-bold mb-6">Bites</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <a
              href="./index.html"
              className="flex items-center text-green-500 font-semibold"
            >
              <span className="material-icons mr-2">
                <i className="fa-solid fa-house" />
              </span>
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="../public/pages/recipe.html"
              className="flex items-center text-gray-600"
            >
              <span className="material-icons mr-2">
                <i className="fa-solid fa-mug-hot" />
              </span>
              Recipes
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-600">
              <span className="material-icons mr-2">
                <i className="fa-solid fa-users" />
              </span>
              User
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-600">
              <span className="material-icons mr-2">
                <i className="fa-regular fa-pen-to-square" />
              </span>
              Reviews
            </a>
          </li>
        </ul>
      </nav>
    </aside>;
  }