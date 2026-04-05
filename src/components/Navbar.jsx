import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString();

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/70 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LEFT: BRAND */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="logo"
            className="w-10 h-10 rounded-full border border-blue-500/40 group-hover:scale-105 transition"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Vigyan
            </span>
            <span className="text-[11px] text-purple-400 tracking-wider">
              AI Powered Library
            </span>
          </div>
        </Link>

        {/* CENTER: PRIMARY ACTION */}
        <div className="flex items-center">
          <Link
            to="/library_view"
            className="relative group px-7 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300"
          >
            {/* Glow Layer */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-70 blur-md group-hover:opacity-100 transition duration-300"></span>

            {/* Button */}
            <span
              className={`relative z-10 flex items-center gap-2 px-6 py-2 rounded-full border transition-all duration-300 ${
                isActive("/library_view")
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg"
                  : "bg-black/40 text-gray-200 border-white/10 group-hover:border-blue-400 group-hover:text-white"
              }`}
            >
              📚 View Library
            </span>

            {/* Shine Effect (inline animation) */}
            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span
                className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/10 skew-x-12 opacity-0 group-hover:opacity-100"
                style={{
                  animation: "shine 1.5s linear",
                }}
              ></span>
            </span>

            {/* Inline Keyframes */}
            <style>
              {`
        @keyframes shine {
          0% { left: -75%; }
          100% { left: 125%; }
        }
      `}
            </style>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* TIME */}
          <div className="hidden md:flex flex-col items-end text-xs text-gray-400 leading-tight">
            <span>{formattedDate}</span>
            <span className="text-blue-400 font-medium">{formattedTime}</span>
          </div>

          {/* AUTH */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-1.5 text-sm rounded-full text-white bg-white/10 hover:bg-white/20 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow hover:scale-105 transition"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10">
                {user?.name || "User"}
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-1.5 text-sm rounded-full bg-red-500/80 hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
