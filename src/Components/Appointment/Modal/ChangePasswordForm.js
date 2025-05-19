import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePasswordForm({ userId, onCancel, onChangePassword }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
    validateField(field, formData[field]);
  };

  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "currentPassword":
        if (!value) error = "Vui lòng nhập mật khẩu hiện tại";
        break;
      case "newPassword":
        if (!value) error = "Vui lòng nhập mật khẩu mới";
        else if (value.length < 6)
          error = "Mật khẩu mới phải có ít nhất 6 ký tự";
        else if (value === formData.currentPassword)
          error = "Mật khẩu mới không được trùng với mật khẩu hiện tại";
        break;
      case "confirmPassword":
        if (!value) error = "Vui lòng xác nhận mật khẩu mới";
        else if (value !== formData.newPassword)
          error = "Xác nhận mật khẩu không khớp";
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    return !error;
  };

  const validateForm = () => {
    let isValid = true;
    ["currentPassword", "newPassword", "confirmPassword"].forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    if (!validateForm()) return;

    setLoading(true);
    setErrors((prev) => ({ ...prev, form: null }));

    try {
      const message = await onChangePassword(
        userId,
        formData.currentPassword,
        formData.newPassword,
        formData.confirmPassword
      );

      setSuccess(true);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
      setTouched({});

      // Show success message
      console.log("Success message:", message);

      // Redirect after a delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      const errorMsg =
        typeof error === "object" && error !== null && error.message
          ? error.message
          : typeof error === "string"
          ? error
          : "Không thể thay đổi mật khẩu. Vui lòng kiểm tra lại.";

      setErrors((prev) => ({
        ...prev,
        form: errorMsg,
      }));
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordField = (field, label, placeholder) => {
    const hasError = touched[field] && errors[field];

    return (
      <div className="space-y-1">
        <label
          htmlFor={field}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          type="password"
          id={field}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          onBlur={() => handleBlur(field)}
          placeholder={placeholder}
          disabled={loading}
          className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
            hasError
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-300 focus:ring-purple-200 hover:border-gray-400"
          }`}
        />
        {hasError && (
          <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 text-center">
          <span className="text-sm font-medium">
            Mật khẩu đã được thay đổi thành công!
          </span>
        </div>
      )}

      {errors.form && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-center">
          <span className="text-sm font-medium">{errors.form}</span>
        </div>
      )}

      {renderPasswordField(
        "currentPassword",
        "Mật khẩu hiện tại",
        "Nhập mật khẩu hiện tại"
      )}
      {renderPasswordField("newPassword", "Mật khẩu mới", "Nhập mật khẩu mới")}
      {renderPasswordField(
        "confirmPassword",
        "Xác nhận mật khẩu mới",
        "Nhập lại mật khẩu mới"
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
        >
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
