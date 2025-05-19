import axios from "axios";

const BASE_URL = "http://localhost:8888/api/v1/users";

export const getUserById = async (userId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token không hợp lệ");
  }
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateUserById = async (userId, updateData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token không hợp lệ");
  }

  try {
    const response = await axios.patch(
      `${BASE_URL}/update/${userId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const changePassword = async (
  userId,
  oldPassword,
  newPassword,
  confirmNewPassword
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token không hợp lệ");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/change-password/${userId}`,
      {
        oldPassword,
        newPassword,
        confirmNewPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status !== "OK") {
      throw new Error(response.data.message || "Đổi mật khẩu thất bại");
    }

    return response.data.message;
  } catch (error) {
    throw error.response?.data || error.message || "Đổi mật khẩu thất bại";
  }
};
