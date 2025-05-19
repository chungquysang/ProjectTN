import React, { useState, useEffect } from "react";
import { updateUserById } from "../../../services/API/UserPT";

function EditProfileForm({ userData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    code: "",
    email: "",
    userId: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Format từ ISO (backend) -> DD/MM/YYYY
  const formatDateToDisplay = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format từ DD/MM/YYYY -> YYYY-MM-DD (backend)
  const formatDateForBackend = (ddmmyyyy) => {
    const [day, month, year] = ddmmyyyy.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const mapGenderToBackend = (genderVN) => {
    const map = { Nam: "Male", Nữ: "Female", Khác: "Other" };
    return map[genderVN] || genderVN;
  };

  const mapGenderToVN = (gender) => {
    const map = { Male: "Nam", Female: "Nữ", Other: "Khác" };
    return map[gender] || gender;
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || userData.username || "",
        dateOfBirth: formatDateToDisplay(
          userData.dateOfBirth || userData.birthday
        ),
        gender: mapGenderToVN(userData.gender || ""),
        code: userData.code || userData.patientCode || "",
        email: userData.email || "",
        userId: userData.userId || userData.id || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = "";

    if (field === "name") {
      if (!value.trim()) error = "Họ tên không được để trống";
      else if (value.trim().length < 2)
        error = "Họ tên phải có ít nhất 2 ký tự";
    }

    if (field === "dateOfBirth") {
      if (!value.trim()) error = "Ngày sinh không được để trống";
      else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value))
        error = "Định dạng phải là DD/MM/YYYY";
    }

    if (field === "gender") {
      if (!value.trim()) error = "Vui lòng chọn giới tính";
    }

    if (field === "email") {
      if (!value.trim()) error = "Email không được để trống";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Email không hợp lệ";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateForm = () => {
    const requiredFields = ["name", "dateOfBirth", "gender", "email"];
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!validateField(field, formData[field])) isValid = false;
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (!validateForm()) return;

    const payload = {
      username: formData.name.trim(),
      dateOfBirth: formatDateForBackend(formData.dateOfBirth),
      gender: mapGenderToBackend(formData.gender),
      email: formData.email.trim(),
    };

    try {
      const updated = await updateUserById(formData.userId, payload);
      onSave(updated);
    } catch (err) {
      console.error("Lỗi cập nhật:", err.response || err);
      alert(
        "Lỗi khi cập nhật: " +
          (err.response?.data?.message || err.message || "Không xác định")
      );
    }
  };

  const renderField = (field, label, type = "text", readOnly = false) => {
    const error = touched[field] && errors[field];
    const value = formData[field];

    return (
      <div className="space-y-1">
        <label
          htmlFor={field}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>

        {field === "gender" ? (
          <select
            id={field}
            name={field}
            value={value}
            onChange={handleChange}
            onBlur={() => handleBlur(field)}
            disabled={readOnly}
            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
              error
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 hover:border-gray-400"
            } ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        ) : (
          <input
            type={type}
            id={field}
            name={field}
            value={value}
            onChange={handleChange}
            onBlur={() => handleBlur(field)}
            readOnly={readOnly}
            placeholder={field === "dateOfBirth" ? "DD/MM/YYYY" : ""}
            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200 ${
              error
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200 hover:border-gray-400"
            } ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
          />
        )}
        {error && <p className="text-sm text-red-600 mt-1">{errors[field]}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderField("name", "Họ tên")}
      {renderField("dateOfBirth", "Ngày sinh")}
      {renderField("gender", "Giới tính")}
      {renderField("code", "Mã bệnh nhân", "text", true)}
      {renderField("email", "Email", "email")} {/* Email đã mở khóa */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Lưu thay đổi
        </button>
      </div>
    </form>
  );
}

export default EditProfileForm;
