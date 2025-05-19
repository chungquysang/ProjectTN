import axios from "axios";

const BASE_URL = "http://localhost:8888/api/v1/admin/medicines";

// Truyền doctorId trực tiếp từ nơi gọi hàm
export const addMedicine = async (Data) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(
            `${BASE_URL}/add-medicine`,
            Data,
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

export const getMedicine = async () => {
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

export const deleteMedicine = async (id_medicine) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.delete(
            `${BASE_URL}/${id_medicine}`,
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


export const uploadAvatarMedicine = async (MedicineId, formData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Không tìm thấy token.");
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/uploads/${MedicineId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                    // Không cần set Content-Type, axios tự làm khi dùng FormData
                }
            }
        );

        // ✅ Lấy ra message hoặc status từ phản hồi
        const { message, status } = response.data;
        return { message, status };
    } catch (error) {
        // ✅ Xử lý lỗi rõ ràng hơn
        if (error.response && error.response.data) {
            const { message } = error.response.data;
            throw new Error(message || "Upload thất bại");
        } else {
            throw new Error("Lỗi không xác định khi upload");
        }
    }
};

export const loadAvatarMedicine = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Không tìm thấy token.");
    }

    try {
        const response = await axios.get(`${BASE_URL}/avatar/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType: 'blob' // để lấy hình ảnh dạng blob
        });

        // Chuyển blob thành URL để hiển thị ảnh
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (error) {
        console.error("Lỗi khi tải avatar:", error);
        throw error;
    }
};


export const updateMedicine = async (id, Data) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Không tìm thấy token.");
    }

    try {
        const response = await axios.put(
            `${BASE_URL}/update/${id}`,
            Data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin thuốc:", error);
        throw error.response?.data || error;
    }
};
