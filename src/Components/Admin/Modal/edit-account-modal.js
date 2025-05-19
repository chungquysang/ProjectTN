import React, { useState, useEffect } from "react";
import { getAllrole } from "../../../services/API/Role";
function EditAccount({ user, onClose, onSave, }) {
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(updatedUser.roles[0]?.id || "");

    useEffect(() => {
        setUpdatedUser({ ...user });
        if (user.roles && user.roles.length > 0) {
            setSelectedRole(user.roles[0].role_id);
            // console.log(user.roles[0].role_id)
        }
    }, [user]);

    // Load roles from service
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await getAllrole();
                // console.log("role_user", response.data.data);
                setRoles(response.data.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };
        fetchRoles();
    }, []);


    const handleChange = (field, value) => {
        setUpdatedUser((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
        setUpdatedUser((prev) => ({
            ...prev,
            roles: [{ id: e.target.value, nameRole: e.target.selectedOptions[0].text }],
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdatedUser((prev) => ({
                    ...prev,
                    profileImage: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(updatedUser);
        onClose();
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClose(); // Close modal if clicking outside
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 modal-overlay"
            onClick={handleOutsideClick}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[90vh] overflow-y-auto flex relative">
                {/* Close Button */}
                <button
                    className="absolute top-2 right-4 text-gray-600 text-[40px] hover:text-red-500 cursor-pointer transition-colors duration-200"
                    onClick={onClose}
                >
                    ×
                </button>

                <div className="flex-1 p-4">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Cập nhật tài khoản</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>

                        <div className="flex flex-col items-center">
                            {updatedUser.profileImage ? (
                                <img
                                    src={updatedUser.profileImage}
                                    alt="Profile Preview"
                                    className="w-24 h-24 rounded-lg object-cover border"
                                />
                            ) : (
                                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span>No Image</span>
                                </div>
                            )}
                            <input
                                type="file"
                                className="mt-2 text-sm"
                                onChange={handleImageChange}
                            />
                        </div>

                        {[
                            { label: "Username", field: "username" },
                            { label: "Email", field: "email" },
                            { label: "Phone Number", field: "phoneNumber" },
                            { label: "Address", field: "address" },
                        ].map(({ label, field }) => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {label}
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    value={updatedUser[field] || ""}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                />
                            </div>
                        ))}

                        {/* Role - combobox */}
                        {roles.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    {roles.map((role) => (
                                        <option key={role.role_id} value={role.id}>
                                            {role.description}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditAccount;
