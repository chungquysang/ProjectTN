import React, { useState, useEffect } from "react";
import { getUserById } from "../../../services/API/UserPT"; // Điều chỉnh lại đường dẫn này theo cấu trúc dự án của bạn
import {
  EditProfileForm,
  ChangePasswordForm,
} from "../../../Components/Appointment/Modal/controllerRouter";
import { Edit, Key, X } from "lucide-react";

function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date)) return "N/A";
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function UserProfile({ onUpdateProfile, onChangePassword }) {
  const [mode, setMode] = useState("view"); // 'view', 'edit', 'password'
  const [isAnimating, setIsAnimating] = useState(false);
  const [userData, setUserData] = useState(null); // Trạng thái lưu trữ dữ liệu người dùng
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Lấy userId từ localStorage

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  // Lấy dữ liệu người dùng từ API khi component được mount
  useEffect(() => {
    if (!userId) {
      setError("Người dùng chưa đăng nhập");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const data = await getUserById(userId); // Lấy dữ liệu với userId
        setUserData(data); // Cập nhật dữ liệu người dùng
      } catch (err) {
        setError(err.message); // Xử lý lỗi nếu việc lấy dữ liệu thất bại
      } finally {
        setLoading(false); // Đặt trạng thái loading là false khi đã lấy dữ liệu xong
      }

      try {
        const data = await getUserById(userId);
        setUserData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleModeChange = (newMode) => {
    setIsAnimating(true);
    setTimeout(() => {
      setMode(newMode);
      setIsAnimating(false);
    }, 150);
  };

  const handleSaveProfile = (updatedData) => {
    setUserData(updatedData); // Cập nhật UI với dữ liệu hồ sơ mới
    onUpdateProfile(updatedData); // Gọi hàm của parent để lưu thay đổi vào server nếu cần thiết
    handleModeChange("view");
  };

  // Nếu dữ liệu đang được tải hoặc có lỗi, hiển thị thông báo tương ứng
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-blue-50 via-transparent to-transparent" />

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 transition-all duration-300">
              {mode === "view"
                ? "Thông tin cá nhân"
                : mode === "edit"
                ? "Chỉnh sửa thông tin"
                : "Thay đổi mật khẩu"}
            </h2>

            {mode === "view" ? (
              <div className="flex space-x-3">
                <button
                  onClick={() => handleModeChange("edit")}
                  className="p-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 group"
                  aria-label="Chỉnh sửa thông tin"
                >
                  <Edit
                    size={20}
                    className="group-hover:rotate-12 transition-transform duration-300"
                  />
                </button>
                <button
                  onClick={() => handleModeChange("password")}
                  className="p-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 group"
                  aria-label="Thay đổi mật khẩu"
                >
                  <Key
                    size={20}
                    className="group-hover:rotate-12 transition-transform duration-300"
                  />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleModeChange("view")}
                className="p-2.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                aria-label="Hủy"
              >
                <X size={20} />
              </button>
            )}
          </div>

          <div
            className={`transition-opacity duration-150 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            {mode === "view" && userData && (
              <div className="space-y-4">
                {Object.entries({
                  "Họ tên": userData.username,
                  "Ngày sinh": formatDate(userData.dateOfBirth) || "N/A",
                  "Giới tính": userData.gender,
                  "Mã bệnh nhân": userData.userId,
                  Email: userData.email,
                  "Số điện thoại": userData.phoneNumber,
                }).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium text-gray-600 w-32">
                      {label}:
                    </span>
                    <span className="text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {mode === "edit" && (
              <EditProfileForm
                userData={userData}
                onSave={handleSaveProfile}
                onCancel={() => handleModeChange("view")}
              />
            )}

            {mode === "password" && (
              <ChangePasswordForm
                userId={userId}
                onCancel={() => handleModeChange("view")}
                onChangePassword={onChangePassword}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
