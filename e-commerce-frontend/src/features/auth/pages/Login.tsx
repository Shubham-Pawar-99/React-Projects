import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { Navigate, useNavigate } from "react-router-dom"
import { login } from "../auth.slice"
import toast from "react-hot-toast"

const Login = () => {
    const dispatch = useAppDispatch()
    const auth = useAppSelector((state) => state.auth)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")

    if (auth.user) return <Navigate to='/' replace />

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (email == '' && password == '') return
        try {
            await dispatch(login({ email, password })).unwrap();
            toast.success("Login Successful")
            navigate("/")
        } catch (error: any) {
            toast.error(error?.message || "Login failed");
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 text-center my-2">
            <h2 className="text-2xl mb-4">Login</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border"
                />
                <button type="submit" className="w-full p-2 bg-blue-600 rounded text-white active:scale-95">
                    {auth.loading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login