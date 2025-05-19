import axios from "axios";

const BASE_URL = "http://localhost:8888/api/v1/admin";

export const getAlltotalpage = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token không hợp lệ");

  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Chỉ trả về thông tin phân trang
    return {
      totalPages: response.data.data.totalPages,
      pageSize: response.data.data.pageSize,
    };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllUsersByPage = async (pageNumber) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token không hợp lệ");

  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { pageNumber },
    });

    return response.data.data.users;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserByid = async (userId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token không hợp lệ");
  }
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
