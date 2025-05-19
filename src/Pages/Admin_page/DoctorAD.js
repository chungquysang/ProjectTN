import {
  SidebarAdmin,
  HeaderAdmin,
} from "../../Components/Admin/controllerRouter";
import { Filter, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import { AddEmployee } from "../../Components/Admin/Modal/controllerRouter"; // Import your modal component here

const PAGE_SIZE = 5;

const initialData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    code: "BS001",
    gender: "Nam",
    dob: "15/5/1985",
    phone: "0901234567",
    email: "nguyenvana@hospital.com",
    role: "Bác sĩ",
    specialty: "Tim mạch",
    department: "Khoa Tim mạch",
    status: "Đang làm việc",
    startDate: "10/3/2018",
  },
  {
    id: 2,
    name: "Trần Thị B",
    code: "LT001",
    gender: "Nữ",
    dob: "22/8/1990",
    phone: "0912345678",
    email: "tranthib@hospital.com",
    role: "Lễ tân",
    specialty: "—",
    department: "Tiếp tân",
    status: "Đang làm việc",
    startDate: "15/6/2019",
  },
  {
    id: 3,
    name: "Lê Văn C",
    code: "BS002",
    gender: "Nam",
    dob: "30/11/1982",
    phone: "0923456789",
    email: "levanc@hospital.com",
    role: "Bác sĩ",
    specialty: "Nhi khoa",
    department: "Khoa Nhi",
    status: "Đang làm việc",
    startDate: "5/9/2017",
  },
  {
    id: 4,
    name: "Nguyễn Văn A",
    code: "BS001",
    gender: "Nam",
    dob: "15/5/1985",
    phone: "0901234567",
    email: "nguyenvana@hospital.com",
    role: "Bác sĩ",
    specialty: "Tim mạch",
    department: "Khoa Tim mạch",
    status: "Đang làm việc",
    startDate: "10/3/2018",
  },
  {
    id: 5,
    name: "Trần Thị B",
    code: "LT001",
    gender: "Nữ",
    dob: "22/8/1990",
    phone: "0912345678",
    email: "tranthib@hospital.com",
    role: "Lễ tân",
    specialty: "—",
    department: "Tiếp tân",
    status: "Đang làm việc",
    startDate: "15/6/2019",
  },
  {
    id: 6,
    name: "Lê Văn C",
    code: "BS002",
    gender: "Nam",
    dob: "30/11/1982",
    phone: "0923456789",
    email: "levanc@hospital.com",
    role: "Bác sĩ",
    specialty: "Nhi khoa",
    department: "Khoa Nhi",
    status: "Đang làm việc",
    startDate: "5/9/2017",
  },
  {
    id: 7,
    name: "Nguyễn Văn A",
    code: "BS001",
    gender: "Nam",
    dob: "15/5/1985",
    phone: "0901234567",
    email: "nguyenvana@hospital.com",
    role: "Bác sĩ",
    specialty: "Tim mạch",
    department: "Khoa Tim mạch",
    status: "Đang làm việc",
    startDate: "10/3/2018",
  },
  {
    id: 8,
    name: "Trần Thị B",
    code: "LT001",
    gender: "Nữ",
    dob: "22/8/1990",
    phone: "0912345678",
    email: "tranthib@hospital.com",
    role: "Lễ tân",
    specialty: "—",
    department: "Tiếp tân",
    status: "Đang làm việc",
    startDate: "15/6/2019",
  },
  {
    id: 9,
    name: "Lê Văn C",
    code: "BS002",
    gender: "Nam",
    dob: "30/11/1982",
    phone: "0923456789",
    email: "levanc@hospital.com",
    role: "Bác sĩ",
    specialty: "Nhi khoa",
    department: "Khoa Nhi",
    status: "Đang làm việc",
    startDate: "5/9/2017",
  },
  {
    id: 10,
    name: "Nguyễn Văn A",
    code: "BS001",
    gender: "Nam",
    dob: "15/5/1985",
    phone: "0901234567",
    email: "nguyenvana@hospital.com",
    role: "Bác sĩ",
    specialty: "Tim mạch",
    department: "Khoa Tim mạch",
    status: "Đang làm việc",
    startDate: "10/3/2018",
  },
  {
    id: 11,
    name: "Trần Thị B",
    code: "LT001",
    gender: "Nữ",
    dob: "22/8/1990",
    phone: "0912345678",
    email: "tranthib@hospital.com",
    role: "Lễ tân",
    specialty: "—",
    department: "Tiếp tân",
    status: "Đang làm việc",
    startDate: "15/6/2019",
  },
  {
    id: 12,
    name: "Lê Văn C",
    code: "BS002",
    gender: "Nam",
    dob: "30/11/1982",
    phone: "0923456789",
    email: "levanc@hospital.com",
    role: "Bác sĩ",
    specialty: "Nhi khoa",
    department: "Khoa Nhi",
    status: "Đang làm việc",
    startDate: "5/9/2017",
  },
  {
    id: 13,
    name: "Nguyễn Văn A",
    code: "BS001",
    gender: "Nam",
    dob: "15/5/1985",
    phone: "0901234567",
    email: "nguyenvana@hospital.com",
    role: "Bác sĩ",
    specialty: "Tim mạch",
    department: "Khoa Tim mạch",
    status: "Đang làm việc",
    startDate: "10/3/2018",
  },
  {
    id: 14,
    name: "Trần Thị B",
    code: "LT001",
    gender: "Nữ",
    dob: "22/8/1990",
    phone: "0912345678",
    email: "tranthib@hospital.com",
    role: "Lễ tân",
    specialty: "—",
    department: "Tiếp tân",
    status: "Đang làm việc",
    startDate: "15/6/2019",
  },
  {
    id: 15,
    name: "Lê Văn C",
    code: "BS002",
    gender: "Nam",
    dob: "30/11/1982",
    phone: "0923456789",
    email: "levanc@hospital.com",
    role: "Bác sĩ",
    specialty: "Nhi khoa",
    department: "Khoa Nhi",
    status: "Đang làm việc",
    startDate: "5/9/2017",
  },
  {
    id: 1,
    name: "Nguyễn Văn A",
    code: "BS001",
    gender: "Nam",
    dob: "15/5/1985",
    phone: "0901234567",
    email: "nguyenvana@hospital.com",
    role: "Bác sĩ",
    specialty: "Tim mạch",
    department: "Khoa Tim mạch",
    status: "Đang làm việc",
    startDate: "10/3/2018",
  },
  {
    id: 2,
    name: "Trần Thị B",
    code: "LT001",
    gender: "Nữ",
    dob: "22/8/1990",
    phone: "0912345678",
    email: "tranthib@hospital.com",
    role: "Lễ tân",
    specialty: "—",
    department: "Tiếp tân",
    status: "Đang làm việc",
    startDate: "15/6/2019",
  },
  {
    id: 3,
    name: "Lê Văn C",
    code: "BS002",
    gender: "Nam",
    dob: "30/11/1982",
    phone: "0923456789",
    email: "levanc@hospital.com",
    role: "Bác sĩ",
    specialty: "Nhi khoa",
    department: "Khoa Nhi",
    status: "Đang làm việc",
    startDate: "5/9/2017",
  },
];

function DoctorAdmin() {
  const [showFilters, setShowFilters] = useState(false);

  const [employees, setEmployees] = useState(initialData);
  const [searchText] = useState("");
  const [filterRole] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [editItem, setEditItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    code: "",
    gender: "Nam",
    dob: "",
    phone: "",
    email: "",
    role: "Bác sĩ",
    specialty: "",
    department: "",
    status: "Đang làm việc",
    startDate: "",
  });

  const filteredData = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchText.toLowerCase()) ||
      e.code.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = filterRole === "Tất cả" || e.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  // Hàm xóa
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    }
  };

  // Hàm lưu chỉnh sửa
  const handleSaveEdit = () => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === editItem.id ? editItem : e))
    );
    setEditItem(null);
    alert("Cập nhật thành công (giả lập)");
  };

  // Hàm thêm mới
  const handleAddNew = () => {
    const newId =
      employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;

    const employeeToAdd = {
      ...newEmployee,
      id: newId,
    };

    setEmployees((prev) => [...prev, employeeToAdd]);

    setNewEmployee({
      name: "",
      code: "",
      gender: "Nam",
      dob: "",
      phone: "",
      email: "",
      role: "Bác sĩ",
      specialty: "",
      department: "",
      status: "Đang làm việc",
      startDate: "",
    });

    setShowAddModal(false);
    alert("Thêm mới nhân viên thành công (giả lập)");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Doctor / Lễ tân
            </h1>
            <p className="text-gray-500">
              Quản lý hồ sơ thông tin cá nhân và chuyên môn của các nhân viên y
              tế
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col gap-4 py-2 ">
            {/* Search & Filter button */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              {/* Left: Search + Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc mã nhân viên"
                  className="w-full md:w-[300px] border rounded px-3 py-2 text-sm"
                />
                <button
                  className="p-2 border rounded hover:bg-gray-100"
                  onClick={() => setShowFilters((prev) => !prev)}
                >
                  <Filter className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Right: Add Button */}
              <div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="h-10 bg-[#0d926e] hover:bg-green-700 text-white font-semibold px-4 rounded focus:outline-none"
                >
                  + Thêm mới nhân viên
                </button>
              </div>
            </div>

            {/* Bộ lọc xuất hiện dưới */}
            {showFilters && (
              <div className="p-4 bg-white border rounded shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* Vai trò */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Vai trò
                    </label>
                    <select className="w-full border rounded px-2 py-1 text-sm">
                      <option>Tất cả</option>
                      <option>Bác sĩ</option>
                      <option>Y tá</option>
                    </select>
                  </div>

                  {/* Chuyên khoa */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Chuyên khoa
                    </label>
                    <select className="w-full border rounded px-2 py-1 text-sm">
                      <option>Tất cả</option>
                      <option>Nội khoa</option>
                      <option>Ngoại khoa</option>
                    </select>
                  </div>

                  {/* Phòng ban */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phòng ban
                    </label>
                    <select className="w-full border rounded px-2 py-1 text-sm">
                      <option>Tất cả</option>
                      <option>Phòng A</option>
                      <option>Phòng B</option>
                    </select>
                  </div>

                  {/* Trạng thái */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Trạng thái
                    </label>
                    <select className="w-full border rounded px-2 py-1 text-sm">
                      <option>Tất cả</option>
                      <option>Đang làm</option>
                      <option>Đã nghỉ</option>
                    </select>
                  </div>

                  {/* Nút Đặt lại */}
                  <div className="flex items-end">
                    <button className="w-full px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 text-sm">
                      Đặt lại
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bảng nhân viên bên dưới */}
          </div>

          {/* Table */}
          <div className="overflow-x-auto border rounded mb-4 max-w-full">
            <table className="min-w-full text-sm whitespace-nowrap">
              <thead className="bg-gray-100 text-left">
                <tr>
                  {[
                    "Họ và tên",
                    "Mã NV",
                    "Giới tính",
                    "Ngày sinh",
                    "SĐT",
                    "Email",
                    "Vị trí",
                    "Chuyên khoa",
                    "Phòng ban",
                    "Trạng thái",
                    "Ngày vào làm",
                    "Hành động",
                  ].map((h, idx) => (
                    <th key={idx} className="px-4 py-2">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((e) => (
                  <tr key={e.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{e.name}</td>
                    <td className="px-4 py-2">{e.code}</td>
                    <td className="px-4 py-2">{e.gender}</td>
                    <td className="px-4 py-2">{e.dob}</td>
                    <td className="px-4 py-2">{e.phone}</td>
                    <td className="px-4 py-2">{e.email}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${e.role === "Bác sĩ"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                          }`}
                      >
                        {e.role}
                      </span>
                    </td>
                    <td className="px-4 py-2">{e.specialty}</td>
                    <td className="px-4 py-2">{e.department}</td>
                    <td className="px-4 py-2">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{e.startDate}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => setEditItem(e)}
                        className="p-1 hover:bg-blue-100 rounded"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(e.id)}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Phân trang */}
          <div className="flex justify-end items-center gap-4 text-sm mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Trước
            </button>
            <span className="text-gray-700 font-medium">
              Trang{" "}
              <span className="font-semibold text-blue-600">{currentPage}</span>{" "}
              / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Sau
            </button>
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-2xl relative">
            <button
              onClick={() => setEditItem(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-6 text-gray-800">
              Chỉnh sửa nhân viên: {editItem.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Họ và tên *
                </label>
                <input
                  value={editItem.name || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Mã nhân viên *
                </label>
                <input
                  value={editItem.code || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, code: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Giới tính *
                </label>
                <select
                  value={editItem.gender || "Nam"}
                  onChange={(e) =>
                    setEditItem({ ...editItem, gender: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Ngày sinh *
                </label>
                <input
                  type="date"
                  value={editItem.dob || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, dob: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Số điện thoại *
                </label>
                <input
                  value={editItem.phone || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, phone: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  value={editItem.email || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, email: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Vai trò *
                </label>
                <select
                  value={editItem.role || "Bác sĩ"}
                  onChange={(e) =>
                    setEditItem({ ...editItem, role: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                >
                  <option value="Bác sĩ">Bác sĩ</option>
                  <option value="Y tá">Y tá</option>
                  <option value="Lễ tân">Lễ tân</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Chuyên khoa *
                </label>
                <input
                  value={editItem.specialty || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, specialty: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phòng ban *
                </label>
                <input
                  value={editItem.department || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, department: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Trạng thái *
                </label>
                <select
                  value={editItem.status || "Đang làm việc"}
                  onChange={(e) =>
                    setEditItem({ ...editItem, status: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                >
                  <option value="Đang làm việc">Đang làm việc</option>
                  <option value="Đã nghỉ">Đã nghỉ</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Ngày vào làm *
                </label>
                <input
                  type="date"
                  value={editItem.startDate || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, startDate: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditItem(null)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddEmployee
          onClose={() => setShowAddModal(false)}
          onSave={handleAddNew}
          employee={newEmployee}
          setEmployee={setNewEmployee}
        />
      )}
    </div>
  );
}

export default DoctorAdmin;
