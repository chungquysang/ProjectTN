import { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Thêm dòng này
import { sendOtp, verifyOtp, resetPassword } from "../services/API/OTP";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const otpRefs = useRef([]);
  const navigate = useNavigate(); // ✅ Hook điều hướng

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      showMessage("error", "Email không hợp lệ");
      return;
    }

    setLoading(true);

    try {
      const data = await sendOtp(email);
      showMessage(
        "success",
        data.message || "Mã OTP đã được gửi đến email của bạn"
      );
      setStep(2);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Gửi mã OTP không thành công"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      showMessage("error", "Vui lòng nhập đủ 6 số OTP");
      return;
    }

    setLoading(true);

    try {
      const message = await verifyOtp(email, otpCode);
      showMessage("success", message || "Mã OTP hợp lệ");
      setStep(3);
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Xác minh OTP không thành công"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showMessage("error", "Mật khẩu xác nhận không khớp");
      return;
    }

    if (newPassword.length < 7) {
      showMessage("error", "Mật khẩu phải có ít nhất 7 ký tự");
      return;
    }

    setLoading(true);

    try {
      const message = await resetPassword(newPassword, confirmPassword);
      showMessage("success", message || "Đặt lại mật khẩu thành công");
      navigate("/login", { replace: true }); // ✅ Điều hướng thay cho onBack
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message || "Đặt lại mật khẩu không thành công"
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordConditions = newPassword.length >= 7;
  const isFormValid = passwordConditions && newPassword === confirmPassword;

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient-to-r from-blue-100 to-pink-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-auto"
      >
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/login", { replace: true })} // ✅ Thay onBack
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <ArrowLeft />
          </button>
          <h2 className="ml-4 text-xl font-semibold text-gray-700">
            Quên mật khẩu
          </h2>
        </div>

        {message.text && (
          <div
            className={`mb-4 p-2 text-center text-sm rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Địa chỉ email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Nhập địa chỉ email của bạn"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 mt-4 text-white rounded-md ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Đang gửi..." : "Gửi mã OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Nhập mã OTP
              </label>
              <div className="flex space-x-2 mt-2 justify-center">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    ref={(el) => (otpRefs.current[index] = el)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 mt-4 text-white rounded-md ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Đang xác minh..." : "Xác minh OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Mật khẩu mới
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Nhập mật khẩu mới"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600"
              >
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Xác nhận mật khẩu mới"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={`w-full py-3 px-4 mt-4 text-white rounded-md ${
                loading || !isFormValid
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Đang đặt lại mật khẩu..." : "Đặt lại mật khẩu"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
