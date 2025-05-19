import axios from "axios";

const BASE_URL = "http://localhost:8888/api/v1/doctors";

// Truyền doctorId trực tiếp từ nơi gọi hàm
export const GetinformationBS = async (id_user) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${BASE_URL}/${id_user}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Trả về toàn bộ thông tin bác sĩ
        return response.data;

    } catch (error) {
        throw error.response?.data || error;
    }
};



export const updateDoctorInformation = async (id_user, updatedData,) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Không tìm thấy token.");
    }

    try {
        const response = await axios.put(`${BASE_URL}/upload/${id_user}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin bác sĩ:", error);
        throw error.response?.data || error;
    }
};


export const loadAvatarDoctor = async (userId) => {
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

export const uploadAvatarDoctor = async (userId, formData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Không tìm thấy token.");
    }

    try {
        const response = await axios.post(
            `${BASE_URL}/upload-avatar/${userId}`,
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




