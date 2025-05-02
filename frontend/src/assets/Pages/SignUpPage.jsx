import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User2,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  const password = formData.password;

  useEffect(() => {
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const medium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!password) setStrength("");
    else if (strong.test(password)) setStrength("Strong");
    else if (medium.test(password)) setStrength("Medium");
    else setStrength("Weak");
  }, [password]);

  const validateForm = () => {
    const name = formData.fullName.trim();
    const email = formData.email.trim();

    if (!name) return toast.error("Full name is required");
    if (!email) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
    if (!password) return toast.error("Password is required");
    if (strength === "Weak")
      return toast.error("Please choose a stronger password");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      await signup(formData);
      navigate("/");
    }
  };

  if (authUser) return <Navigate to="/" />;

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get Started with free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <User2 className="size-5 text-base-content/40" />
                <input
                  type="text"
                  className="grow"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </label>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <Mail className="size-5 text-base-content/40" />
                <input
                  type="email"
                  className="grow"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </label>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 pr-2">
                <Lock className="size-5 text-base-content/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="grow"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-base-content/40"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </label>

              {/* Password strength meter */}
              {password && (
                <div className="mt-2">
                  <div className="h-2 rounded bg-base-300 overflow-hidden">
                    <div
                      className={`h-2 transition-all duration-300 ${
                        strength === "Weak"
                          ? "w-1/3 bg-error"
                          : strength === "Medium"
                          ? "w-2/3 bg-warning"
                          : "w-full bg-success"
                      }`}
                    ></div>
                  </div>
                  <p
                    className={`text-xs mt-1 font-medium ${
                      strength === "Weak"
                        ? "text-error"
                        : strength === "Medium"
                        ? "text-warning"
                        : "text-success"
                    }`}
                  >
                    {strength} Password
                  </p>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Join our Community"
        subtitle="Connect with friends, share moments, and stay in touch"
      />
    </div>
  );
};

export default SignUpPage;
