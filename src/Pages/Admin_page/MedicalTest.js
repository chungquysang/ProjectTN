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

// Simplified SidebarAdmin component

// Hàm tạo dữ liệu mẫu
const generateMedicalTests = () => {
  const departments = [
    "Huyết học",
    "Sinh hóa",
    "Xét nghiệm",
    "Nội tiết",
    "Vi sinh",
    "Miễn dịch",
    "Giải phẫu bệnh",
  ];
  const statuses = ["Đang hoạt động", "Ngưng sử dụng", "Tạm ngưng"];
  const durations = ["24 giờ", "48 giờ", "72 giờ", "12 giờ", "6 giờ", "2 giờ"];

  // Dữ liệu mẫu từ hình ảnh
  const initialTests = [
    {
      id: "XN001",
      name: "Xét nghiệm máu tổng quát",
      description: "Kiểm tra các chỉ số cơ bản trong máu",
      price: 250000,
      duration: "24 giờ",
      department: "Huyết học",
      status: "Đang hoạt động",
    },
    {
      id: "XN002",
      name: "Xét nghiệm chức năng gan",
      description: "Đánh giá các chỉ số hoạt động của gan",
      price: 350000,
      duration: "48 giờ",
      department: "Sinh hóa",
      status: "Đang hoạt động",
    },
    {
      id: "XN003",
      name: "Xét nghiệm nước tiểu",
      description: "Phân tích các chỉ số trong nước tiểu",
      price: 150000,
      duration: "24 giờ",
      department: "Xét nghiệm",
      status: "Đang hoạt động",
    },
    {
      id: "XN004",
      name: "Xét nghiệm hormone tuyến giáp",
      description: "Kiểm tra chức năng tuyến giáp",
      price: 450000,
      duration: "72 giờ",
      department: "Nội tiết",
      status: "Ngưng sử dụng",
    },
  ];

  // Tạo thêm dữ liệu mẫu
  const testNames = [
    "Xét nghiệm đường huyết",
    "Xét nghiệm lipid máu",
    "Xét nghiệm chức năng thận",
    "Xét nghiệm điện giải đồ",
    "Xét nghiệm vi khuẩn",
    "Xét nghiệm virus",
    "Xét nghiệm kháng thể",
    "Xét nghiệm nội tiết tố",
    "Xét nghiệm tế bào máu",
    "Xét nghiệm đông máu",
    "Xét nghiệm miễn dịch",
    "Xét nghiệm dị ứng",
    "Xét nghiệm tế bào học",
    "Xét nghiệm gen",
    "Xét nghiệm ADN",
    "Xét nghiệm chẩn đoán ung thư",
  ];

  const descriptionPrefixes = [
    "Kiểm tra",
    "Đánh giá",
    "Chẩn đoán",
    "Phân tích",
    "Xác định",
    "Theo dõi",
    "Sàng lọc",
  ];

  const descriptionSuffixes = [
    "chỉ số trong máu",
    "nồng độ trong huyết thanh",
    "chức năng cơ quan",
    "tình trạng bệnh lý",
    "dấu hiệu bất thường",
    "các yếu tố nguy cơ",
    "các chỉ số sinh hóa",
    "các marker sinh học",
  ];

  const tests = [...initialTests];

  // Thêm nhiều xét nghiệm để có đủ dữ liệu cho phân trang
  for (let i = 5; i <= 25; i++) {
    const name = testNames[Math.floor(Math.random() * testNames.length)];
    const department =
      departments[Math.floor(Math.random() * departments.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const duration = durations[Math.floor(Math.random() * durations.length)];
    const prefix =
      descriptionPrefixes[
      Math.floor(Math.random() * descriptionPrefixes.length)
      ];
    const suffix =
      descriptionSuffixes[
      Math.floor(Math.random() * descriptionSuffixes.length)
      ];

    const price = Math.round(Math.random() * 190 + 10) * 10000;

    tests.push({
      id: `XN${i.toString().padStart(3, "0")}`,
      name: name,
      description: `${prefix} ${suffix}`,
      price: price,
      duration: duration,
      department: department,
      status: status,
    });
  }

  return tests;
};

// Số lượng xét nghiệm hiển thị trên mỗi trang
const ITEMS_PER_PAGE = 10;

function MedicalTestManagement() {
  const [medicalTests] = useState(generateMedicalTests());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc xét nghiệm theo từ khóa tìm kiếm
  const filteredTests = medicalTests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán tổng số trang
  const totalPages = Math.ceil(filteredTests.length / ITEMS_PER_PAGE);

  // Lấy xét nghiệm cho trang hiện tại
  const currentTests = filteredTests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Xử lý xóa xét nghiệm
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa xét nghiệm này?")) {
      alert(`Đã xóa xét nghiệm có ID: ${id}`);
    }
  };

  // Hiển thị badge cho khoa
  const renderDepartmentBadge = (department) => {
    const baseClasses =
      "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap";

    switch (department) {
      case "Huyết học":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            {department}
          </span>
        );
      case "Sinh hóa":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            {department}
          </span>
        );
      case "Xét nghiệm":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
            {department}
          </span>
        );
      case "Nội tiết":
        return (
          <span className={`${baseClasses} bg-purple-100 text-purple-800`}>
            {department}
          </span>
        );
      case "Vi sinh":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            {department}
          </span>
        );
      case "Miễn dịch":
        return (
          <span className={`${baseClasses} bg-teal-100 text-teal-800`}>
            {department}
          </span>
        );
      case "Giải phẫu bệnh":
        return (
          <span className={`${baseClasses} bg-orange-100 text-orange-800`}>
            {department}
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            {department}
          </span>
        );
    }
  };

  // Hiển thị trạng thái xét nghiệm
  const renderTestStatus = (status) => {
    if (status === "Đang hoạt động") {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">
          {status}
        </span>
      );
    } else if (status === "Tạm ngưng") {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 whitespace-nowrap">
          {status}
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 whitespace-nowrap">
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
              Quản lý xét nghiệm
            </h1>
            <p className="text-gray-500">
              Quản lý danh sách xét nghiệm y tế và thông tin chi tiết
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
                placeholder="Tìm kiếm xét nghiệm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute inset-y-0 right-0 flex items-center pr-3">
                <SlidersHorizontal className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <button className="ml-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-4 py-2.5 flex items-center">
              <Plus className="h-5 w-5 mr-1" />
              Thêm xét nghiệm mới
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 table-fixed">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-t border-b">
                <tr>
                  <th scope="col" className="px-6 py-3 w-28">
                    Mã xét nghiệm
                  </th>
                  <th scope="col" className="px-6 py-3 w-52">
                    Tên xét nghiệm
                  </th>
                  <th scope="col" className="px-6 py-3 w-64">
                    Mô tả
                  </th>
                  <th scope="col" className="px-6 py-3 w-32">
                    Giá tiền
                  </th>
                  <th scope="col" className="px-6 py-3 w-28">
                    Thời gian
                  </th>
                  <th scope="col" className="px-6 py-3 w-32">
                    Khoa
                  </th>
                  <th scope="col" className="px-6 py-3 w-40">
                    Trạng thái
                  </th>
                  {/* <th scope="col" className="px-6 py-3 w-24">
                    Thao tác
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {currentTests.map((test) => (
                  <tr
                    key={test.id}
                    className="bg-white border-b hover:bg-gray-50 group relative"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {test.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {test.name}
                    </td>
                    <td
                      className="px-6 py-4 truncate max-w-xs"
                      title={test.description}
                    >
                      {test.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {test.price.toLocaleString()} đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {test.duration}
                    </td>
                    <td className="px-6 py-4">
                      {renderDepartmentBadge(test.department)}
                    </td>
                    <td className="px-6 py-4">
                      {renderTestStatus(test.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="invisible group-hover:visible absolute right-6 bg-white shadow-md rounded-lg p-1 flex space-x-1 transition-all duration-200 z-10">
                        <button className="p-1.5 bg-yellow-50 rounded-lg hover:bg-yellow-100">
                          <Edit className="h-4 w-4 text-yellow-600" />
                        </button>
                        <button
                          className="p-1.5 bg-red-50 rounded-lg hover:bg-red-100"
                          onClick={() => handleDelete(test.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
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
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredTests.length)}
              </span>{" "}
              trong <span className="font-medium">{filteredTests.length}</span>{" "}
              kết quả
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

export default function Page() {
  return <MedicalTestManagement />;
}
