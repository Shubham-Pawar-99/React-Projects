import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Button, Input } from "../components/index";
import { login as storeLogin } from "../store/slice/auth.slice";
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

        <div className="relative w-full max-w-md">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>

          <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-8 pb-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                {/* <h2 className="text-3xl font-bold text-white text-center mb-2">
                Welcome Back
              </h2> */}
                {/* <p className="text-gray-400 text-center">
                  Sign in to continue to MegaBlog
                </p> */}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-300 font-medium">
                      Authentication Error
                    </p>
                    <p className="text-red-400 text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <div className="px-8 pb-8">
              <form onSubmit={handleSubmit(login)}>
                <div className="space-y-5">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border ${
                          errors.email ? "border-red-500" : "border-gray-600"
                        } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`w-full pl-12 pr-12 py-3 bg-gray-700/50 border ${
                          errors.password ? "border-red-500" : "border-gray-600"
                        } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    isLoading={loading}
                    className="w-full mt-6"
                    startIcon={<LogIn size={20} />}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </div>
              </form>

              {/* Sign Up Link */}
              <div className="text-center my-8">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors hover:underline"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
