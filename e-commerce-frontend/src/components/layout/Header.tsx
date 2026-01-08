import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout } from "../../features/auth/auth.slice";

const Header = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    return (
        <header className="p-4 border-b-2">
            <div className="container mx-auto flex justify-between items-center">
                <Link to='/' className="text-xl font-bold">E-Shop</Link>
                <nav className="flex items-center gap-4">
                    <Link to='/product'>Product</Link>
                    <Link to="/cart">Cart</Link>
                    {auth.user ? (
                        <>
                            <span>{auth.user.name}</span>
                            <button
                                onClick={() => dispatch(logout())}
                                className="bg-red-600 px-6 py-3 border-2 text-white text-sm"
                            >
                                Logout
                            </button>
                        </>
                    ) :
                        (
                            <Link to="/login">Login</Link>
                        )}
                </nav>
            </div>
        </header>
    )
}

export default Header