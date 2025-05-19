"use client";

import { useState } from "react";
import {
  SidebarAdmin,
  HeaderAdmin,
} from "../../Components/Admin/controllerRouter";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

// Hàm tạo dữ liệu mẫu
const generateServices = () => {
  const serviceTypes = [
    "Khám",
    "Chẩn đoán",
    "Xét nghiệm",
    "Điều trị",
    "Phẫu thuật",
    "Tư vấn",
  ];
  const statuses = ["Đang hoạt động", "Ngưng sử dụng", "Tạm ngưng"];

  const serviceNames = [
    "Khám tổng quát",
    "Siêu âm bụng tổng quát",
    "Xét nghiệm máu cơ bản",
    "Nội soi dạ dày",
    "Châm cứu",
    "Chụp X-quang",
    "Chụp CT Scanner",
    "Chụp MRI",
    "Xét nghiệm nước tiểu",
    "Điện tim",
    "Đo mật độ xương",
    "Khám mắt",
    "Khám tai mũi họng",
    "Khám da liễu",
    "Khám sản phụ khoa",
    "Khám nhi",
    "Khám nội tiết",
    "Khám tim mạch",
    "Phẫu thuật cắt ruột thừa",
    "Phẫu thuật thay khớp gối",
    "Tư vấn dinh dưỡng",
    "Tư vấn tâm lý",
  ];

  const descriptionPrefixes = [
    "Kiểm tra",
    "Đánh giá",
    "Chẩn đoán",
    "Điều trị",
    "Phân tích",
    "Theo dõi",
    "Phục hồi",
  ];

  const descriptionSuffixes = [
    "sức khỏe tổng thể",
    "các cơ quan nội tạng",
    "chỉ số sinh hóa",
    "tình trạng bệnh lý",
    "chức năng cơ quan",
    "dấu hiệu bất thường",
    "quá trình phục hồi",
    "các triệu chứng",
  ];

  const services = [
    {
      id: "1",
      name: "Khám tổng quát",
      description: "Khám sức khỏe tổng quát định kỳ",
      price: 500000,
      type: "Khám",
      status: "Đang hoạt động",
    },
    {
      id: "2",
      name: "Siêu âm bụng tổng quát",
      description: "Siêu âm kiểm tra các cơ quan trong ổ bụng",
      price: 250000,
      type: "Chẩn đoán",
      status: "Đang hoạt động",
    },
  ];

  // Thêm nhiều dịch vụ để có đủ dữ liệu cho phân trang
  for (let i = 3; i <= 25; i++) {
    const name = serviceNames[Math.floor(Math.random() * serviceNames.length)];
    const type = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const prefix =
      descriptionPrefixes[
      Math.floor(Math.random() * descriptionPrefixes.length)
      ];
    const suffix =
      descriptionSuffixes[
      Math.floor(Math.random() * descriptionSuffixes.length)
      ];

    const price = Math.round(Math.random() * 190 + 10) * 10000;

    services.push({
      id: i.toString(),
      name: name,
      description: `${prefix} ${suffix}`,
      price: price,
      type: type,
      status: status,
    });
  }

  return services;
};

// Số lượng dịch vụ hiển thị trên mỗi trang
const ITEMS_PER_PAGE = 10;

function ServiceManagement() {
  const [services] = useState(generateServices());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dịch vụ theo từ khóa tìm kiếm
  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán tổng số trang
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

  // Lấy dịch vụ cho trang hiện tại
  const currentServices = filteredServices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Xử lý xóa dịch vụ
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      alert(`Đã xóa dịch vụ có ID: ${id}`);
    }
  };

  // Hiển thị badge cho loại dịch vụ
  const renderServiceTypeBadge = (type) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";

    switch (type) {
      case "Khám":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
            {type}
          </span>
        );
      case "Chẩn đoán":
        return (
          <span className={`${baseClasses} bg-purple-100 text-purple-800`}>
            {type}
          </span>
        );
      case "Xét nghiệm":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            {type}
          </span>
        );
      case "Điều trị":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            {type}
          </span>
        );
      case "Phẫu thuật":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            {type}
          </span>
        );
      case "Tư vấn":
        return (
          <span className={`${baseClasses} bg-teal-100 text-teal-800`}>
            {type}
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            {type}
          </span>
        );
    }
  };

  // Hiển thị trạng thái dịch vụ
  const renderServiceStatus = (status) => {
    if (status === "Đang hoạt động") {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {status}
        </span>
      );
    } else if (status === "Tạm ngưng") {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {status}
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {status}
        </span>
      );
    }
  };

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Quản lý dịch vụ
            </h1>
            <p className="text-gray-500">
              Quản lý danh sách dịch vụ và thông tin chi tiết
            </p>
          </div>

          <div className="px-6 pb-4 flex justify-between items-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Tìm kiếm dịch vụ"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute inset-y-0 right-0 flex items-center pr-3">
                <SlidersHorizontal className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <button className="ml-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-4 py-2.5 flex items-center">
              <Plus className="h-5 w-5 mr-1" />
              Thêm dịch vụ mới
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-t border-b">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tên dịch vụ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mô tả
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giá tiền
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Loại dịch vụ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentServices.map((service) => (
                  <tr
                    key={service.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {service.name}
                    </td>
                    <td className="px-6 py-4">{service.description}</td>
                    <td className="px-6 py-4">
                      {service.price.toLocaleString()} đ
                    </td>
                    <td className="px-6 py-4">
                      {renderServiceTypeBadge(service.type)}
                    </td>
                    <td className="px-6 py-4">
                      {renderServiceStatus(service.status)}
                    </td>
                    <td className="px-6 py-4 flex justify-center space-x-2">
                      <button className="p-1.5 bg-blue-50 rounded-lg hover:bg-blue-100">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button
                        className="p-1.5 bg-red-50 rounded-lg hover:bg-red-100"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Hiển thị{" "}
              <span className="font-medium">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              đến{" "}
              <span className="font-medium">
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredServices.length
                )}
              </span>{" "}
              trong{" "}
              <span className="font-medium">{filteredServices.length}</span> kết
              quả
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageToShow = i + 1;

                if (totalPages > 5 && currentPage > 3) {
                  pageToShow = currentPage - 2 + i;
                }

                if (pageToShow > totalPages) return null;

                return (
                  <button
                    key={pageToShow}
                    className={`px-3 py-1 border rounded-md ${currentPage === pageToShow
                      ? "bg-blue-50 text-blue-600 border-blue-300"
                      : "border-gray-300 hover:bg-gray-50"
                      }`}
                    onClick={() => handlePageChange(pageToShow)}
                  >
                    {pageToShow}
                  </button>
                );
              })}

              <button
                className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ServiceManagement;
