import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

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

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed w-full z-50 backdrop-blur-xl bg-black/60 border-b border-blue-500/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Left */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="logo"
            className="w-10 h-10 rounded-full object-cover border border-blue-500/40 shadow-md"
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-wide">
            Vigyan
          </h1>
        </Link>

        {/* Center */}
        <motion.div
          animate={{
            textShadow: [
              "0 0 5px #3b82f6",
              "0 0 15px #8b5cf6",
              "0 0 5px #3b82f6",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="ml-28 text-xl font-semibold tracking-widest bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent"
        >
          AI Digital Library
        </motion.div>

        {/* Right */}
        <div className="flex items-center gap-4 ml-20">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-5 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-5 py-1.5 rounded-full border border-blue-500 text-blue-400 hover:bg-blue-500/10 transition duration-300"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-5 py-1.5 rounded-full bg-red-500/80 hover:bg-red-600 transition duration-300 shadow-md"
            >
              Logout
            </button>
          )}

          {/* Clock */}
          <div className="px-4 py-2 rounded-lg bg-black/40 border border-blue-500/30 shadow-inner backdrop-blur-md text-blue-400 font-mono text-sm text-center min-w-[130px]">
            <div>{formattedDate}</div>
            <div className="text-base font-semibold">{formattedTime}</div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
