import axios from "axios";

const BASE_URL = "http://localhost:8888/api/v1/auth";

export const login = async (email, password) => {
  // console.log("Email:", email, "Password:", password);

  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, { token });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
