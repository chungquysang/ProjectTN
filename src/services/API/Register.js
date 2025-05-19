import axios from "axios";

const BASE_URL = "http://localhost:8888/api/v1/account";

export const register = async (
  username,
  email,
  phoneNumber,
  password,
  dateOfBirth,
  gender
) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      username,
      email,
      phoneNumber,
      password,
      dateOfBirth,
      gender,
    });

    if (response.data && response.data.status === "CREATED") {
      return {
        success: true,
        message: "Đăng ký tài khoản thành công",
      };
    }

    return {
      success: false,
      message:
        response.data.message || "Đăng ký thất bại. Vui lòng thử lại sau.",
    };
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Đăng ký thất bại. Vui lòng thử lại sau.",
      };
    } else if (error.request) {
      return {
        success: false,
        message: "Lỗi mạng. Vui lòng kiểm tra kết nối internet của bạn.",
      };
    } else {
      console.error("Lỗi không mong muốn:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      };
    }
  }
};
