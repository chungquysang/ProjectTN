import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  UserIcon,
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  BellIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  EyeIcon,
  XIcon,
  Building2Icon,
  PlusIcon,
  ChevronRightIcon,
  CameraIcon,
} from "lucide-react";

import { Footer, Header } from "../../Components/Appointment/controllerRouter";
import MedicalRecord from "../../Components/Appointment/Tabs/MedicalRecord";
import UserProfile from "../../Components/Appointment/Tabs/UserProfile";
import Notifications from "../../Components/Appointment/Tabs/Notification";

function DashboardAppointment() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || "appointments");

  const [userProfile, setUserProfile] = useState({
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserProfile((prev) => ({
        ...prev,
        name: user.username,
        birthday: user.dateOfBirth,
        gender: user.gender,
        code: user.userId,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }));
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile((prevState) => ({
          ...prevState,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/Home/DashboardAppointment/${tabId}`);
  };

  const appointmentList = [
    {
      id: 1,
      department: "Nội tổng quát",
      date: "15/06/2023",
      time: "09:30",
      status: "confirmed",
      doctor: "BS. Nguyễn Văn A",
    },
    {
      id: 2,
      department: "Tai-mũi-họng",
      date: "22/06/2023",
      time: "14:00",
      status: "pending",
      doctor: "BS. Trần Thị B",
    },
  ];

  const TABS = [
    {
      id: "appointments",
      icon: <CalendarIcon className="w-5 h-5" />,
      label: "Lịch khám",
    },
    {
      id: "medicalRecords",
      icon: <FileTextIcon className="w-5 h-5" />,
      label: "Hồ sơ y tế",
    },
    {
      id: "notifications",
      icon: <BellIcon className="w-5 h-5" />,
      label: "Thông báo",
    },
    {
      id: "profile",
      icon: <UserIcon className="w-5 h-5" />,
      label: "Thông tin cá nhân",
    },
  ];

  const getStatusLabel = (status) => {
    const statusConfig = {
      confirmed: {
        icon: <CheckCircleIcon className="w-4 h-4 mr-1.5" />,
        text: "Đã xác nhận",
        className: "bg-green-50 text-green-700",
      },
      pending: {
        icon: <ClockIcon className="w-4 h-4 mr-1.5" />,
        text: "Chờ xác nhận",
        className: "bg-yellow-50 text-yellow-700",
      },
      cancelled: {
        icon: <AlertCircleIcon className="w-4 h-4 mr-1.5" />,
        text: "Đã hủy",
        className: "bg-red-50 text-red-700",
      },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.className}`}
      >
        {config.icon}
        {config.text}
      </span>
    );
  };

  const renderAppointments = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Lịch khám của bạn
          </h2>
          <p className="text-gray-500 text-sm">
            Quản lý các cuộc hẹn khám bệnh
          </p>
        </div>
        <Link
          to="/Home/DashboardAppointment/AppointmentRegistration"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 group"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          <span>Đăng ký khám mới</span>
          <ChevronRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {appointmentList.length > 0 ? (
        <div className="space-y-4">
          {appointmentList.map((appointment) => (
            <div
              key={appointment.id}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                appointment.status === "confirmed"
                  ? "border-green-200 hover:border-green-300"
                  : appointment.status === "pending"
                  ? "border-yellow-200 hover:border-yellow-300"
                  : "border-red-200 hover:border-red-300"
              } hover:shadow-md`}
            >
              <div
                className={`p-4 ${
                  appointment.status === "confirmed"
                    ? "bg-green-50"
                    : appointment.status === "pending"
                    ? "bg-yellow-50"
                    : "bg-red-50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Building2Icon className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-800">
                      {appointment.department}
                    </h3>
                  </div>
                  {getStatusLabel(appointment.status)}
                </div>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">Ngày: {appointment.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">Giờ: {appointment.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 sm:col-span-2">
                    <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">
                      Bác sĩ: {appointment.doctor}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => console.log("Xem chi tiết:", appointment)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                  >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    Xem chi tiết
                  </button>

                  {appointment.status === "pending" && (
                    <button
                      onClick={() => console.log("Hủy lịch khám:", appointment)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                    >
                      <XIcon className="w-4 h-4 mr-2" />
                      Hủy lịch khám
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-1">Bạn chưa có lịch khám nào.</p>
          <p className="text-sm text-gray-500">
            Hãy đăng ký khám để được chăm sóc sức khỏe tốt nhất.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <aside className="w-64 p-6 bg-white shadow-md hidden md:block">
          <div className="flex flex-col items-center space-y-4">
            <label htmlFor="avatarInput" className="cursor-pointer relative">
              <img
                src={userProfile.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                <CameraIcon className="w-5 h-5 text-gray-600" />
              </div>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
            <div className="text-center">
              <h3 className="font-semibold text-lg text-gray-800">
                {userProfile.name}
              </h3>
              <p className="text-sm text-gray-500">{userProfile.email}</p>
            </div>
          </div>

          <nav className="mt-10 space-y-2">
            {TABS.map((tabItem) => (
              <button
                key={tabItem.id}
                onClick={() => handleTabChange(tabItem.id)}
                className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeTab === tabItem.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tabItem.icon}
                <span className="ml-3">{tabItem.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === "appointments" && renderAppointments()}
          {activeTab === "medicalRecords" && <MedicalRecord />}
          {activeTab === "notifications" && <Notifications />}
          {activeTab === "profile" && (
            <UserProfile
              userProfile={userProfile} // truyền dữ liệu userProfile hiện tại cho component con
              onUpdateProfile={(updatedData) => {
                console.log("Cập nhật profile nhận được:", updatedData);
                setUserProfile((prev) => {
                  const newProfile = { ...prev, ...updatedData };

                  // Cập nhật localStorage luôn
                  const currentUser =
                    JSON.parse(localStorage.getItem("user")) || {};
                  const updatedUser = { ...currentUser, ...updatedData };
                  localStorage.setItem("user", JSON.stringify(updatedUser));

                  return newProfile;
                });
              }}
              onChangePassword={(newPasswordData) =>
                console.log("Mật khẩu mới:", newPasswordData)
              }
            />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardAppointment;
