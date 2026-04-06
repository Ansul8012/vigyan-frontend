import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const { faceAuth, authStatus, authError, user } = useAuthStore();

  const [cameraOn, setCameraOn] = useState(false);

  // 🎥 Start Camera
  const startCamera = async () => {
    setCameraOn(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🧠 Trigger Face Auth
  const handleAuth = async () => {
    await faceAuth();
  };

  // 🔴 Stop Camera
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  // ✅ On success
  useEffect(() => {
    if (authStatus === "success") {
      stopCamera();

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  }, [authStatus]);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      {/* 🔥 TOP TEXT */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          You are one step away from your AI-powered Library
        </h1>

        <p className="text-gray-400 mt-3">
          Secure, seamless and intelligent access using face authentication.
        </p>
      </div>

      {/* MAIN BOX */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
        >
          <h2 className="text-lg font-semibold mb-6 text-center">
            Face Authentication
          </h2>

          {/* CAMERA */}
          {!cameraOn ? (
            <button
              onClick={startCamera}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600"
            >
              🎥 Start Face Login
            </button>
          ) : (
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-60 rounded-lg border border-white/10 object-cover"
              />

              {/* STATUS */}
              {authStatus === "scanning" && (
                <p className="text-center text-blue-400 text-sm">
                  🔍 Scanning face...
                </p>
              )}

              {authStatus === "error" && (
                <div className="text-center text-red-400 text-sm">
                  {authError}
                  <div className="mt-2">
                    <Link to="/signup" className="text-blue-400 underline">
                      Register yourself
                    </Link>
                  </div>
                </div>
              )}

              {authStatus === "success" && (
                <p className="text-center text-green-400 text-sm">
                  ✅ Welcome {user?.name}
                </p>
              )}

              {/* ACTION BUTTON */}
              {authStatus !== "success" && (
                <button
                  onClick={handleAuth}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Verify Face
                </button>
              )}
            </div>
          )}

          {/* SIGNUP */}
          <p className="text-sm text-center text-gray-400 mt-6">
            Not registered?{" "}
            <Link to="/signup" className="text-blue-400">
              Get Started
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
