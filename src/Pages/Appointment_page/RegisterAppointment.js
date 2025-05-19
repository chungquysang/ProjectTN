import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/API/Register";
import {
  UserIcon,
  MailIcon,
  LockIcon,
  CalendarIcon,
  EyeIcon,
  EyeOffIcon,
  Loader2,
  CheckCircle2,
  Phone,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: "", // Dùng username thay cho fullName
    email: "",
    phoneNumber: "", // Cập nhật đúng tên trường phoneNumber
    password: "",
    dateOfBirth: "",
    gender: "male",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name);
  };

  const validateField = (fieldName) => {
    const newErrors = {};
    switch (fieldName) {
      case "username":
        if (!formData.username.trim())
          newErrors.username = "Vui lòng nhập họ tên";
        break;
      case "email":
        if (!formData.email && !formData.phoneNumber)
          newErrors.email = "Vui lòng nhập email hoặc số điện thoại";
        else if (
          formData.email &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        )
          newErrors.email = "Email không hợp lệ";
        break;
      case "phoneNumber":
        if (!formData.email && !formData.phoneNumber)
          newErrors.phoneNumber = "Vui lòng nhập email hoặc số điện thoại";
        else if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber))
          newErrors.phoneNumber = "Số điện thoại không hợp lệ (10 chữ số)";
        break;
      case "password":
        if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
        else if (formData.password.length < 6)
          newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        break;
      case "dateOfBirth":
        if (!formData.dateOfBirth)
          newErrors.dateOfBirth = "Vui lòng chọn ngày sinh";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Vui lòng nhập họ tên";
    if (!formData.email.trim() && !formData.phoneNumber.trim()) {
      newErrors.email = "Vui lòng nhập email hoặc số điện thoại";
      newErrors.phoneNumber = "Vui lòng nhập email hoặc số điện thoại";
    } else {
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Email không hợp lệ";
      if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber))
        newErrors.phoneNumber = "Số điện thoại không hợp lệ (10 chữ số)";
    }
    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
    else if (formData.password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Vui lòng chọn ngày sinh";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    setIsLoading(true);
    try {
      const response = await register(
        formData.username,
        formData.email,
        formData.phoneNumber,
        formData.password,
        formData.dateOfBirth,
        formData.gender
      );

      if (response && response.success) {
        setRegistrationSuccess(true);
        setTimeout(() => navigate("/loginAppointment"), 1000);
      } else {
        setErrors({ submit: response?.message || "Đăng ký không thành công." });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "Đăng ký thất bại. Vui lòng thử lại sau." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-6 px-8">
            <h2 className="text-2xl font-bold text-white">Đăng ký tài khoản</h2>
            <p className="text-indigo-100 mt-1">
              Tạo tài khoản để đặt lịch khám bệnh
            </p>
          </div>
          <form className="py-8 px-8 space-y-6" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                {errors.submit}
              </div>
            )}

            <InputField
              id="username"
              label="Họ tên"
              icon={<UserIcon size={18} />}
              placeholder="Nhập họ tên đầy đủ"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.username}
              error={errors.username}
            />

            <InputField
              id="email"
              label="Email"
              icon={<MailIcon size={18} />}
              placeholder="Nhập địa chỉ email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.email}
              error={errors.email}
            />

            <InputField
              id="phoneNumber"
              label="Số điện thoại"
              icon={<Phone size={18} />}
              placeholder="Nhập số điện thoại"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.phoneNumber}
              error={errors.phoneNumber}
            />

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <LockIcon size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-10 py-3 border ${
                    touched.password && errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  placeholder="Nhập mật khẩu"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </div>
              </div>
              {touched.password && errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <InputField
              id="dateOfBirth"
              label="Ngày sinh"
              icon={<CalendarIcon size={18} />}
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.dateOfBirth}
              error={errors.dateOfBirth}
            />

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Giới tính <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                {["male", "female", "other"].map((value) => (
                  <label key={value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value={value}
                      checked={formData.gender === value}
                      onChange={handleChange}
                      className="form-radio text-indigo-600"
                    />
                    <span>
                      {value === "male"
                        ? "Nam"
                        : value === "female"
                        ? "Nữ"
                        : "Khác"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || registrationSuccess}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white ${
                isLoading || registrationSuccess
                  ? "bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  <span>Đang đăng ký...</span>
                </>
              ) : registrationSuccess ? (
                <>
                  <CheckCircle2 size={20} className="mr-2" />
                  <span>Đăng ký thành công!</span>
                </>
              ) : (
                "Đăng ký"
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Đã có tài khoản?{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  id,
  label,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  touched,
  error,
}) => (
  <div>
    <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full pl-10 pr-3 py-3 border ${
          touched && error ? "border-red-500 bg-red-50" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        placeholder={placeholder}
      />
    </div>
    {touched && error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
  </div>
);

export default Register;
