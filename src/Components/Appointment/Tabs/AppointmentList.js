import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Eye,
  X,
  CheckCircle,
  AlertCircle,
  Plus,
  ChevronRight,
  Building2,
} from "lucide-react";
import { format } from "date-fns";

const getStatusLabel = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return (
        <span className="flex items-center text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full text-sm">
          <CheckCircle className="w-4 h-4 mr-1.5" />
          Đã xác nhận
        </span>
      );
    case "pending":
      return (
        <span className="flex items-center text-yellow-600 font-medium bg-yellow-50 px-3 py-1 rounded-full text-sm">
          <Clock className="w-4 h-4 mr-1.5" />
          Chờ xác nhận
        </span>
      );
    case "cancelled":
      return (
        <span className="flex items-center text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full text-sm">
          <AlertCircle className="w-4 h-4 mr-1.5" />
          Đã hủy
        </span>
      );
    default:
      return status;
  }
};

const AppointmentList = ({
  appointmentList,
  onViewDetail,
  onCancelRequest,
  isLoading,
}) => {
  const [confirmCancel, setConfirmCancel] = useState(null);

  const handleCancel = (appointment) => {
    setConfirmCancel(appointment.id);
  };

  const confirmCancelAction = (appointment) => {
    onCancelRequest(appointment);
    setConfirmCancel(null);
  };

  return (
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
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 group">
          <Plus className="w-4 h-4 mr-2" />
          <span>Đăng ký khám mới</span>
          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="border rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-gray-200 h-6 w-1/3 rounded"></div>
                <div className="bg-gray-200 h-6 w-1/4 rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
                <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
              </div>
              <div className="mt-4 flex gap-2">
                <div className="bg-gray-200 h-8 w-24 rounded"></div>
                <div className="bg-gray-200 h-8 w-24 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : appointmentList.length > 0 ? (
        <div className="space-y-4">
          {appointmentList.map((appointment) => {
            const status = appointment.status?.toLowerCase();
            const isPending = status === "pending";

            return (
              <div
                key={appointment.id}
                className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                  status === "confirmed"
                    ? "border-green-200 hover:border-green-300"
                    : status === "pending"
                    ? "border-yellow-200 hover:border-yellow-300"
                    : status === "cancelled"
                    ? "border-red-200 hover:border-red-300"
                    : "border-gray-200 hover:border-gray-300"
                } hover:shadow-md`}
              >
                <div
                  className={`p-4 ${
                    status === "confirmed"
                      ? "bg-green-50"
                      : status === "pending"
                      ? "bg-yellow-50"
                      : status === "cancelled"
                      ? "bg-red-50"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-gray-600" />
                      <h3 className="font-semibold text-gray-800">
                        {appointment.department}
                      </h3>
                    </div>
                    {getStatusLabel(status)}
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">
                        Ngày: {format(new Date(appointment.date), "dd/MM/yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">Giờ: {appointment.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600 sm:col-span-2">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">
                        Bác sĩ: {appointment.doctor}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onViewDetail(appointment)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Xem chi tiết
                    </button>

                    {isPending && (
                      <button
                        onClick={() => handleCancel(appointment)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Hủy lịch khám
                      </button>
                    )}
                  </div>

                  {confirmCancel === appointment.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-700 mb-3">
                        Bạn có chắc chắn muốn hủy lịch khám này không?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => confirmCancelAction(appointment)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                          Xác nhận hủy
                        </button>
                        <button
                          onClick={() => setConfirmCancel(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        >
                          Giữ lại
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-1">Bạn chưa có lịch khám nào.</p>
          <p className="text-sm text-gray-500">
            Hãy đăng ký khám để được chăm sóc sức khỏe tốt nhất.
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
