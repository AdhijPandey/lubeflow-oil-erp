
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Gauge,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const ADMIN_EMAIL = "admin@lubeflow.com";
    const ADMIN_PASSWORD = "Admin@123";

    if (
      form.email.trim().toLowerCase() === ADMIN_EMAIL &&
      form.password === ADMIN_PASSWORD
    ) {
      const user = {
        name: "Admin",
        email: ADMIN_EMAIL,
        role: "ADMIN",
      };

      const storage = form.remember ? localStorage : sessionStorage;

      // Clear previous session from both storages
      localStorage.removeItem("lubeflow_user");
      localStorage.removeItem("lubeflow_auth");
      sessionStorage.removeItem("lubeflow_user");
      sessionStorage.removeItem("lubeflow_auth");

      storage.setItem("lubeflow_user", JSON.stringify(user));
      storage.setItem("lubeflow_auth", "true");

      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* LOGIN CARD */}
     <div className="relative z-10 w-full max-w-6xl bg-[#171A1F] border border-white/10 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden grid lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#20242B] via-[#24171B] to-[#171A1F] p-10 xl:p-14 text-white overflow-hidden">

          {/* DECORATIVE GLOW */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 blur-[110px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

          {/* LOGO */}
          <Link to="/" className="relative flex items-center gap-3 w-fit">

            <div className="w-14 h-14 bg-[#E53935] rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/30">
              <Gauge size={31} />
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-wide">
                LUBE<span className="text-[#F5A623]">FLOW</span>
              </h1>

              <p className="text-[10px] text-gray-400 tracking-[3px]">
                AUTOMOTIVE LUBRICANTS
              </p>
            </div>

          </Link>

          {/* BRAND CONTENT */}
          <div className="relative z-10">

            <span className="text-[#F5A623] text-xs font-bold tracking-[2px]">
              BUSINESS MANAGEMENT PLATFORM
            </span>

            <h2 className="text-5xl xl:text-6xl font-black leading-tight mt-6">
              Manage Your
              <span className="block text-[#F5A623]">
                Business.
              </span>
              Drive Your Growth.
            </h2>

            <p className="text-gray-400 mt-7 leading-8 max-w-md text-base">
              Manage your automotive lubricant business with
              intelligent inventory, sales, purchase and business
              analytics in one place.
            </p>

            {/* FEATURES */}
            <div className="mt-10 space-y-5">

              {[
                "Complete Inventory Management",
                "Retail & Wholesale Billing",
                "Smart Business Reports",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">

                  <div className="w-8 h-8 rounded-lg bg-[#F5A623]/10 flex items-center justify-center">
                    <ShieldCheck
                      className="text-[#F5A623]"
                      size={19}
                    />
                  </div>

                  <span className="text-sm text-gray-300 font-medium">
                    {item}
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* FOOTER */}
          <p className="relative text-xs text-gray-500">
            © {new Date().getFullYear()} LubeFlow ERP. All rights reserved.
          </p>

        </div>

        {/* RIGHT SIDE LOGIN FORM */}
        <div className="flex items-center justify-center bg-[#1D222B] p-7 sm:p-12 lg:p-14">

          <div className="w-full max-w-md">

            {/* BACK TO HOME */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#F5A623] transition-colors mb-9"
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>

            {/* LOGIN HEADING */}
            <div className="mb-9">

              {/* MOBILE LOGO */}
              <div className="w-14 h-14 bg-[#E53935] rounded-2xl flex items-center justify-center mb-6 lg:hidden text-white shadow-lg shadow-red-900/30">
                <Gauge size={30} />
              </div>

              <span className="text-xs font-bold tracking-[2px] text-[#E53935]">
                ADMINISTRATOR ACCESS
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Welcome Back!
              </h2>

              <p className="text-gray-400 text-sm mt-3">
                Enter your credentials to access your dashboard.
              </p>

            </div>

            <form onSubmit={handleLogin} className="space-y-6">

              {/* EMAIL */}
              <div>

                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@lubeflow.com"
                    required
                    className="w-full h-14 border border-white/10 bg-[#171A1F] text-white placeholder-gray-500 rounded-xl pl-12 pr-4 outline-none focus:border-[#E53935] focus:ring-4 focus:ring-red-500/10 transition-all"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full h-14 border border-white/10 bg-[#171A1F] text-white placeholder-gray-500 rounded-xl pl-12 pr-12 outline-none focus:border-[#E53935] focus:ring-4 focus:ring-red-500/10 transition-all"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#F5A623] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* REMEMBER ME */}
              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">

                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#E53935] cursor-pointer"
                  />

                  Remember me

                </label>

              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full h-14 flex items-center justify-center gap-3 bg-[#E53935] hover:bg-[#C62828] text-white font-bold rounded-xl shadow-lg shadow-red-900/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Sign In
                <ArrowRight size={19} />
              </button>

            </form>

            {/* SECURITY FOOTER */}
            <div className="mt-9 flex items-center justify-center gap-2 text-xs text-gray-500">

              <ShieldCheck size={17} className="text-green-500" />

              Secure Demo Login

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;
