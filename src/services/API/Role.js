import axios from "axios";

const BASE_URL = "http://localhost:8888/api/v1/admin/roles";

// Truyền doctorId trực tiếp từ nơi gọi hàm
export const getAllrole = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${BASE_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;

    } catch (error) {
        throw error.response?.data || error;
    }
};