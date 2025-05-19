import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Google from "../image/Google.png";
import Facebook from "../image/Facebook.png";
import HealthCare from "../image/HealthCare.png";
import HealthCare2 from "../image/HealthCare2.png";
import HealthCare3 from "../image/HealthCare3.png";
import HealthCare4 from "../image/HealthCare4.png";
import { useNavigate } from "react-router-dom";
import { login } from "../services/API/authservices";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login(email.trim(), password.trim());
      const user = result.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      localStorage.setItem("isLoggedIn", "true");

      if (user.roles.includes("DOCTOR")) {
        navigate("/HealthCheck_BS");
      } else if (user.roles.includes("PROTOCOL")) {
        navigate("/Dashboard");
      } else if (user.roles.includes("ADMIN")) {
        navigate("/Admin/Dashboard");
      } else if (user.roles.includes("USER")) {
        navigate("/Home");
      }
    } catch (err) {
      setError("Tài khoản hoặc mật khẩu không đúng.");
    }
  };

  return (
    <form className="space-y-4 w-full" onSubmit={handleLogin}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Mail size={18} className="text-blue-400" />
        </div>
        <input
          type="email"
          required
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={`w-full pl-10 pr-10 py-2 border ${
            error ? "border-red-500" : "border-blue-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Lock size={18} className="text-blue-400" />
        </div>
        <input
          type={passwordVisible ? "text" : "password"}
          required
          minLength={8}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={`w-full pl-10 pr-10 py-2 border ${
            error ? "border-red-500" : "border-blue-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={() => setPasswordVisible((prev) => !prev)}
        >
          {passwordVisible ? (
            <EyeOff size={18} className="text-blue-400" />
          ) : (
            <Eye size={18} className="text-blue-400" />
          )}
        </div>
      </div>

      <div className="text-sm text-blue-500 hover:underline text-right mt-2">
        <button type="button" onClick={() => navigate("/forgotpassword")}>
          Forgot Password?
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">⚠️ {error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const images = [HealthCare2, HealthCare3, HealthCare4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-8"
      style={{
        backgroundImage: `url(${HealthCare})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(255,255,255,0.1)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full min-h-[500px]">
        <div className="flex-1 relative bg-blue-100 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={images[currentImage]}
              alt="Healthcare"
              className="object-cover rounded-lg w-full h-[500px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md"
          >
            ◀
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md"
          >
            ▶
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full ${
                  currentImage === index ? "bg-blue-600" : "bg-blue-300"
                } focus:outline-none`}
              ></button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-blue-900">
              Welcome Back
            </h2>
            <p className="text-sm text-blue-700 mt-2">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-500 hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>

          <LoginForm />

          <div className="flex items-center justify-center gap-4">
            <button className="flex items-center justify-center w-full border border-blue-300 py-2 rounded-lg hover:bg-blue-100">
              <img src={Google} alt="Google" className="h-5 w-5 mr-2" />
              Google
            </button>
            <button className="flex items-center justify-center w-full border border-blue-300 py-2 rounded-lg hover:bg-blue-100">
              <img src={Facebook} alt="Facebook" className="h-5 w-5 mr-2" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
