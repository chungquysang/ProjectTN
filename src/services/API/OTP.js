import axios from "axios";
axios.defaults.withCredentials = true;

const BASE_URL = "http://localhost:8888/api/v1/notification";

// Gửi OTP
export const sendOtp = async (email) => {
  const response = await axios.post(`${BASE_URL}/sendOtp`, { email });
  console.log("response", response.data);
  return response.data.message; // <-- lấy message từ backend trả về
};

// Xác minh OTP
export const verifyOtp = async (email, otp) => {
  const response = await axios.post(`${BASE_URL}/verify-otp`, { email, otp });
  console.log("response", response.data);
  return response.data.message; // <-- lấy message từ backend trả về
};

// Đặt lại mật khẩu
export const resetPassword = async (newPassword, confirmNewPassword) => {
  const response = await axios.post(`${BASE_URL}/reset-password`, {
    newPassword,
    confirmNewPassword, // Gửi confirmNewPassword cùng với newPassword
  });
  console.log("response", response.data);
  return response.data.message; // Trả về message từ backend
};
