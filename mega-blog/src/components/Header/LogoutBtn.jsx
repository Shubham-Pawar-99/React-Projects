import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/slice/auth.slice";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LogoutBtn({ className = "", onClick, variant = "default" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        if (onClick) onClick();
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const variants = {
    default: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    ghost:
      "bg-transparent hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700",
  };

  return (
    <button
      className={`
        flex items-center justify-center space-x-2
        px-4 py-2.5 rounded-lg font-medium
        transition-all duration-200
        hover:shadow-lg active:scale-95
        ${variants[variant]} ${className}
      `}
      onClick={logoutHandler}
      aria-label="Logout"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
}

export default LogoutBtn;
