import React, { useState, useRef, useEffect } from "react";
import { User, Mail, Phone, Briefcase, Users, Check, X } from "lucide-react";

const ProfileInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const formRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: "Nguyễn Văn Admin",
    email: "admin@hospital.vn",
    phone: "0912345678",

    department: "Quản trị hệ thống",
    role: "Quản trị viên",
  });

  const [formData, setFormData] = useState({ ...profileData });
  const [errors, setErrors] = useState({});

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Họ và tên không được để trống";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (validate()) {
      setProfileData({ ...formData });
      setShowSaveSuccess(true);

      setTimeout(() => {
        setIsEditing(false);
        setShowSaveSuccess(false);
      }, 1500);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
    setIsEditing(false);
    setErrors({});
  };

  // Focus on first field when entering edit mode
  useEffect(() => {
    if (isEditing && formRef.current) {
      const firstInput = formRef.current.querySelector("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }, [isEditing]);

  // Field configuration for DRY code
  const fields = [
    {
      id: "name",
      label: "Họ và tên",
      icon: <User className="h-5 w-5" />,
      type: "text",
      autocomplete: "name",
      editable: true,
    },
    {
      id: "email",
      label: "Email",
      icon: <Mail className="h-5 w-5" />,
      type: "email",
      autocomplete: "email",
      editable: true,
    },
    {
      id: "phone",
      label: "Số điện thoại",
      icon: <Phone className="h-5 w-5" />,
      type: "tel",
      autocomplete: "tel",
      editable: true,
    },

    {
      id: "department",
      label: "Phòng ban",
      icon: <Briefcase className="h-5 w-5" />,
      type: "text",
      editable: false,
    },
    {
      id: "role",
      label: "Chức vụ",
      icon: <Users className="h-5 w-5" />,
      type: "text",
      editable: false,
    },
  ];

  return (
    <div className="relative overflow-hidden transition-all duration-300">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 sm:px-8">
        <h2 className="text-2xl font-semibold text-white mb-1">
          Thông tin cá nhân
        </h2>
        <p className="text-blue-100 text-sm">
          {isEditing
            ? "Chỉnh sửa thông tin cá nhân của bạn"
            : "Xem thông tin cá nhân của bạn"}
        </p>

        {/* Success notification */}
        {showSaveSuccess && (
          <div className="absolute top-6 right-6 flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-sm transition-all duration-300 transform animate-fadeIn">
            <Check className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Đã lưu thành công</span>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8">
        {isEditing ? (
          <form ref={formRef} onSubmit={handleSave} className="animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {fields.map((field) => (
                <div key={field.id} className="space-y-1">
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  {field.editable ? (
                    <div className="relative group">
                      <div
                        className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none 
            transition-colors duration-200 ${
              errors[field.id]
                ? "text-red-400"
                : "text-gray-400 group-focus-within:text-blue-500"
            }`}
                      >
                        {field.icon}
                      </div>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        autoComplete={field.autocomplete}
                        value={formData[field.id]}
                        onChange={handleInputChange}
                        className={`py-2.5 pl-10 block w-full border ${
                          errors[field.id]
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                        } 
            rounded-lg shadow-sm transition-all duration-200 text-sm`}
                        aria-invalid={errors[field.id] ? "true" : "false"}
                      />
                      {errors[field.id] && (
                        <p
                          className="mt-1 text-sm text-red-600 animate-fadeIn"
                          role="alert"
                        >
                          {errors[field.id]}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center p-3 bg-gray-100 rounded-lg">
                      <div className="flex-shrink-0 text-blue-500 mr-3">
                        {field.icon}
                      </div>
                      <span className="text-gray-900 font-medium">
                        {profileData[field.id]}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <span className="flex items-center">
                  <X className="h-4 w-4 mr-1.5" />
                  Hủy
                </span>
              </button>
              <button
                type="submit"
                className="px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <span className="flex items-center">
                  <Check className="h-4 w-4 mr-1.5" />
                  Lưu thay đổi
                </span>
              </button>
            </div>
          </form>
        ) : (
          <div className="animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
              {fields.map((field) => (
                <div key={field.id} className="group">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    {field.label}
                  </h3>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-all duration-200">
                    <div className="flex-shrink-0 text-blue-500 mr-3">
                      {field.icon}
                    </div>
                    <span className="text-gray-900 font-medium">
                      {profileData[field.id]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Chỉnh sửa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
