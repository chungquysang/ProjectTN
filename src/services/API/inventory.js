import axios from "axios";

const BASE_URL = "http://localhost:8888/api/v1/admin/medicine-warehouse";

// Truyền doctorId trực tiếp từ nơi gọi hàm
export const addMedcineWarehoure = async (Name) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(
            `${BASE_URL}/add`,
            Name,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
export const getMedcineWarehoure = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(
            `${BASE_URL}/getAll`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const deleteMedcineWarehoure = async (id_categoy) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.delete(
            `${BASE_URL}/delete/${id_categoy}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.message; // chỉ trả về message
    } catch (error) {
        throw error.response?.data?.message || error.message || "Đã xảy ra lỗi";
    }
};

export const updateMedcineWarehoure = async (id, name) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Không tìm thấy token.");
    }

    try {
        const response = await axios.put(`${BASE_URL}/update/${id}`,
            { dosageFormName: name },  // <-- body truyền dưới dạng object JSON
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin danh mục thuốc:", error);
        throw error.response?.data || error;
    }
};
