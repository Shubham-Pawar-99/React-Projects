import React, { useState } from "react";
import { Input, Button } from "../components/index";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../store/slice/auth.slice";
import { Link } from "react-router-dom";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Shield,
} from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const password = watch("password");

  const signup = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const passwordRequirements = [
  //   { regex: /.{8,}/, text: "At least 8 characters" },
  //   { regex: /[0-9]/, text: "At least one number" },
  //   { regex: /[a-z]/, text: "At least one lowercase letter" },
  //   { regex: /[A-Z]/, text: "At least one uppercase letter" },
  //   { regex: /[^A-Za-z0-9]/, text: "At least one special character" },
  // ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>

      <div className="relative w-full max-w-lg">
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl"></div>

        <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              {/* <p className="text-gray-400 text-center">
                Create your account and start sharing your thoughts
              </p> */}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-700/50 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-300 font-medium">Registration Error</p>
                  <p className="text-red-400 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit(signup)}>
              <div className="space-y-5">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`w-full pl-12 pr-4 py-3 bg-gray-700/50 border ${
                        errors.name ? "border-red-500" : "border-gray-600"
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

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
                      placeholder="Create a strong password"
                      className={`w-full pl-12 pr-12 py-3 bg-gray-700/50 border ${
                        errors.password ? "border-red-500" : "border-gray-600"
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                          message: "Password doesn't meet requirements",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/3 transform -translatey-1/2 text-gray-400 hover:text-white transition-colors"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  {/* <div className="mt-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Shield size={14} />
                      Password must contain:
                    </p>
                    <ul className="space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle
                            size={12}
                            className={
                              password && req.regex.test(password)
                                ? "text-green-500"
                                : "text-gray-600"
                            }
                          />
                          <span
                            className={
                              password && req.regex.test(password)
                                ? "text-green-400 text-xs"
                                : "text-gray-500 text-xs"
                            }
                          >
                            {req.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div> */}
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className={`w-full pl-12 pr-12 py-3 bg-gray-700/50 border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-600"
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div> */}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  isLoading={loading}
                  className="w-full mt-2"
                  startIcon={<UserPlus size={20} />}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center py-8">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
