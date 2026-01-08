import {
  BookOpen,
  Home,
  LogIn,
  Menu,
  PlusCircle,
  Search,
  User,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      icon: <Home size={18} />,
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      icon: <BookOpen size={18} />,
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      icon: <PlusCircle size={18} />,
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      icon: <LogIn size={18} />,
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      icon: <UserPlus size={18} />,
      active: !authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg border-b border-gray-800">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link
              to="/"
              className="flex items-center space-x-3 text-white hover:opacity-90 transition-opacity"
            >
              <div className="bg-blue-600 p-2 rounded-lg">
                <span className="text-xl font-bold">MB</span>
              </div>
              <span className="text-2xl font-bold hidden sm:inline-block">
                Mega<span className="text-blue-400">Blog</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.slug}
                  onClick={() => navigate(item.slug)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    item.name === "Add Post"
                      ? "bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ) : null
            )}

            {/* Search Bar */}
            {/* <div className="relative ml-2">
              <input
                type="text"
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2.5 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-48"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div> */}

            {authStatus && (
              <div className="flex items-center space-x-2 ml-4 border-l border-gray-700 pl-4">
                {/* User Profile */}
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors group"
                >
                  <div className="w-9 h-9 bg-gray-800 group-hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="font-medium">
                      {user?.userData?.name?.split(" ")[0] || "User"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {user?.userData?.email || "Profile"}
                    </div>
                  </div>
                </button>

                {/* Logout Button */}
                <div className="ml-2">
                  <LogoutBtn className="bg-gray-800 hover:bg-gray-700 border border-gray-700" />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button (User Icon) */}
          {authStatus && !isMenuOpen && (
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => navigate("/profile")}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <User size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 pb-4 border-t border-gray-800 pt-4">
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navItems.map((item) =>
                item.active ? (
                  <button
                    key={item.slug}
                    onClick={() => {
                      navigate(item.slug);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      item.name === "Add Post"
                        ? "bg-blue-600 text-white font-semibold"
                        : "bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                ) : null
              )}

              {/* Mobile Search */}
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>

              {authStatus && (
                <>
                  <button
                    onClick={() => {
                      // navigate("/profile");
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg mt-4"
                  >
                    <User size={20} />
                    <div>
                      <div className="font-medium">
                        {user?.name || "Profile"}
                      </div>
                      <div className="text-sm text-gray-400">{user?.email}</div>
                    </div>
                  </button>
                  <div className="mt-4">
                    <LogoutBtn
                      className="w-full justify-center"
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
