import { useState, useEffect, useRef } from "react";
import avatar from "../image/avtar.jpg";
import Siderbar from "../Components/Siderbar";
import Header from "../Components/Header";
import { ChevronDown } from "lucide-react";
import {
    uploadAvatarDoctor,
    loadAvatarDoctor,
    updateDoctorInformation,
} from "../services/API/Doctor";
import {
    updateProtocolInformation,
    loadAvatarProtocol,
    uploadAvatarProtocol,
} from "../services/API/Protocal";

const Profile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const isMountedRef = useRef(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const user_id = user?.id;
    const role = user?.roles;


    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                let avatarKey = null;

                if (role?.includes("DOCTOR")) {
                    const doctorData = JSON.parse(localStorage.getItem("Doctor"));
                    avatarKey = doctorData?.avatarDoctor;
                } else if (role?.includes("PROTOCOL")) {
                    const protocolData = JSON.parse(localStorage.getItem("Protocol"));
                    avatarKey = protocolData?.avatarProtocol;
                }

                if (!avatarKey || avatarKey === "null") {
                    if (isMountedRef.current) setAvatarUrl(avatar); // Dùng avatar mặc định
                } else {
                    const url = role?.includes("DOCTOR")
                        ? await loadAvatarDoctor(user_id)
                        : await loadAvatarProtocol(user_id);

                    if (isMountedRef.current) {
                        setAvatarUrl(prev => (prev !== url ? url : prev)); // Cập nhật URL nếu có sự thay đổi
                    }
                }
            } catch (err) {
                console.error("Error fetching avatar:", err);
                if (isMountedRef.current) setAvatarUrl(avatar); // Dùng avatar mặc định nếu có lỗi
            }
            console.log("fetchAvatar")
        };

        if (!avatarUrl && user_id && role) {  // Chỉ gọi khi chưa có avatar
            fetchAvatar();
        }


    }, [user_id, role, avatarUrl]);  // Chỉ phụ thuộc vào user_id và role



    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", selectedImage);

            await (
                role?.includes("DOCTOR")
                    ? uploadAvatarDoctor(user_id, formData)
                    : uploadAvatarProtocol(user_id, formData)
            );
            alert("tải ảnh lên thành công");
            setAvatarUrl(URL.createObjectURL(selectedImage));

        } catch (error) {
            alert("Lỗi khi tải ảnh lên!");
            console.error(error);
        }
    };

    const [form, setForm] = useState(() => {
        const doctorData = role?.includes("DOCTOR")
            ? JSON.parse(localStorage.getItem("Doctor"))
            : null;
        const protocolData = role?.includes("PROTOCOL")
            ? JSON.parse(localStorage.getItem("Protocol"))
            : null;

        if (doctorData) {
            return {
                email: doctorData.email || "",
                fullName: doctorData.fullName || "",
                employeeCode: doctorData.doctor_id || "",
                gender: doctorData.gender || "",
                phoneNumber: doctorData.phoneNumber || "",
                degree: doctorData.degree || "",
                roomId: doctorData.room_Id || "",
                departmentId: doctorData.department_id || "",
            };
        }

        if (protocolData) {
            return {
                email: protocolData.email || "",
                fullName: protocolData.fullName || "",
                employeeCode: protocolData.protocolId || "",
                gender: protocolData.gender || "",
                phoneNumber: protocolData.phoneNumber || "",
                degree: "", // Protocol có thể không có degree
                roomId: protocolData.room_Id || "",
                departmentId: protocolData.department_id || "",
            };
        }

        return {
            email: "",
            fullName: "",
            employeeCode: "",
            gender: "",
            phoneNumber: "",
            degree: "",
            departmentId: "",
            roomId: "",
        };
    });

    const toggleEdit = () => setIsEditing(!isEditing);

    const handleSaveOrEdit = async () => {
        if (isEditing) {
            await handleUpdate();
        }
        toggleEdit();
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        const updatedData = {
            fullName: form.fullName,
            phoneNumber: form.phoneNumber,
            gender: form.gender,
            degree: form.degree,
        };

        try {
            if (role?.includes("DOCTOR")) {
                await updateDoctorInformation(user_id, updatedData);
                const updatedLocalData = {
                    ...JSON.parse(localStorage.getItem("Doctor")),
                    ...updatedData,
                };
                localStorage.setItem("Doctor", JSON.stringify(updatedLocalData));
            } else if (role?.includes("PROTOCOL")) {
                await updateProtocolInformation(user_id, updatedData);
                const updatedLocalData = {
                    ...JSON.parse(localStorage.getItem("Protocol")),
                    ...updatedData,
                };
                localStorage.setItem("Protocol", JSON.stringify(updatedLocalData));
            }

            setForm({ ...form, ...updatedData });
        } catch (error) {
            console.error("Lỗi cập nhật:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {sidebarOpen && <Siderbar />}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    isSidebarOpen={sidebarOpen}
                />
                <main className="p-3 h-full m-auto">
                    <div className="shadow bg-gradient-to-r from-blue-100 via-red-200 to-yellow-100 rounded-2xl w-[800px]">
                        <div className="overflow-hidden rounded-2xl ">
                            <div className="p-6 bg-white mt-20">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={avatarUrl}
                                            alt="avatar"
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <h2 className="text-lg font-semibold">{form.fullName}</h2>
                                            <button
                                                onClick={() => setShowImageModal(true)}
                                                className="mt-1 inline-block px-4 py-1.5 border border-blue-500 text-blue-500 text-xs rounded-lg bg-white hover:bg-blue-50 transition"
                                            >
                                                Change Photo
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleSaveOrEdit}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                                    >
                                        {isEditing ? "Save" : "Edit"}
                                    </button>
                                </div>

                                <form className="gap-6 bg-white p-6 rounded-xl shadow grid grid-cols-2 gap-x-6">
                                    {/* Left */}
                                    <div className="space-y-4">
                                        <InputField
                                            label="Mã nhân viên"
                                            name="employeeCode"
                                            value={form.employeeCode}
                                            disabled
                                        />
                                        <InputField
                                            label="Họ và tên"
                                            name="fullName"
                                            value={form.fullName}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                        <InputField
                                            label="Email"
                                            name="email"
                                            value={form.email}
                                            disabled
                                        />
                                        {!role?.includes("PROTOCOL") && (
                                            <InputField
                                                label="Bằng cấp"
                                                name="degree"
                                                value={form.degree}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                            />
                                        )}
                                    </div>

                                    {/* Right */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-600 block mb-1">Giới tính</label>
                                            <div className="relative">
                                                <select
                                                    name="gender"
                                                    value={form.gender}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className={`w-full appearance-none px-4 py-2 border rounded-lg text-sm pr-8 ${!isEditing ? "bg-gray-100 text-gray-500" : "bg-white"
                                                        }`}
                                                >
                                                    <option value="">Chọn</option>
                                                    <option value="Male">Nam</option>
                                                    <option value="Female">Nữ</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                                            </div>
                                        </div>

                                        {!role?.includes("PROTOCOL") && (
                                            <InputField
                                                label="Phòng"
                                                name="roomId"
                                                value={form.roomId}
                                                disabled
                                            />
                                        )}
                                        <InputField
                                            label="Số điện thoại"
                                            name="phoneNumber"
                                            value={form.phoneNumber}
                                            onChange={handleChange}
                                            maxLength={12}
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            disabled={!isEditing}
                                        />
                                        {!role?.includes("PROTOCOL") && (
                                            <InputField
                                                label="Phòng ban"
                                                name="departmentId"
                                                value={form.departmentId}
                                                disabled
                                            />
                                        )}
                                    </div>
                                </form>

                                {showImageModal && (
                                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                                        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
                                            <h3 className="text-lg font-semibold mb-4">Cập nhật ảnh đại diện</h3>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        setSelectedImage(file);
                                                        setPreviewUrl(URL.createObjectURL(file));
                                                    }
                                                }}
                                                className="mb-4 w-full text-sm text-gray-500"
                                            />
                                            {previewUrl && (
                                                <div className="mb-4">
                                                    <img
                                                        src={previewUrl}
                                                        alt="Preview"
                                                        className="w-32 h-32 object-cover rounded-full border mx-auto"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setShowImageModal(false);
                                                        setPreviewUrl(null);
                                                        setSelectedImage(null);
                                                    }}
                                                    className="px-4 py-1.5 text-sm rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100"
                                                >
                                                    Hủy
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (selectedImage) {
                                                            handleImageUpload();
                                                            setShowImageModal(false);
                                                        } else {
                                                            alert("Vui lòng chọn ảnh để tải lên");
                                                        }
                                                    }}
                                                    className="px-4 py-1.5 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                                                >
                                                    Lưu ảnh
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setShowImageModal(false);
                                                    setPreviewUrl(null);
                                                    setSelectedImage(null);
                                                }}
                                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

const InputField = ({ label, name, value, onChange, disabled, ...props }) => (
    <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-4 py-2 border rounded-lg text-sm ${disabled ? "bg-gray-100 text-gray-500" : "bg-white"
                }`}
            {...props}
        />
    </div>
);

export default Profile;
