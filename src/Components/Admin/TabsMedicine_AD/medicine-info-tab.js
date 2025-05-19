"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, ArrowUp, ArrowDown, Plus, ArrowLeft, ArrowRight, Search } from "lucide-react";
import { getMedicine, deleteMedicine, loadAvatarMedicine } from "../../../services/API/Medicine";
import { AddMedcine, EditMedcine } from "../Modal/controllerRouter";



export default function MedicineTab() {
  const [medicines, setMedicines] = useState([]);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setIsLoading(true);
    try {
      const data = await getMedicine();
      const dataWithAvatars = await Promise.all(
        data.map(async (medicine) => {
          const isValidImage =
            medicine?.medicineAvatar &&
            medicine.medicineAvatar !== "null" &&
            medicine.medicineAvatar !== null &&
            medicine.medicineAvatar !== undefined;

          if (isValidImage && medicine.medicineId) {
            try {
              const avatar = await loadAvatarMedicine(medicine.medicineId);
              return { ...medicine, avatarUrl: avatar };
            } catch (err) {
              console.warn(`Không load được ảnh cho thuốc ID ${medicine.medicineId}`);
              return { ...medicine, avatarUrl: null };
            }
          } else {
            // Nếu không có ảnh hợp lệ thì bỏ qua
            return { ...medicine, avatarUrl: null };
          }
        })
      );

      setMedicines(dataWithAvatars);
    } catch (error) {
      console.error("Lỗi khi tải danh sách thuốc:", error);
    } finally {
      setIsLoading(false);
    }
  };




  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const onEdit = (medicine) => {
    setSelectedMedicine(medicine);
    setShowEditModal(true);
  };



  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const normalizeText = (text) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const filteredMedicines = medicines.filter((medicine) =>
    normalizeText(medicine.medicineName).toLowerCase().includes(normalizeText(searchQuery).toLowerCase())
  );

  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (
      sortField === "name" ||
      sortField === "category" ||
      sortField === "dosageForm" ||
      sortField === "status"
    ) {
      return sortDirection === "asc"
        ? (a[sortField] || "").localeCompare(b[sortField] || "")
        : (b[sortField] || "").localeCompare(a[sortField] || "");
    } else if (sortField === "medicinePrice") {
      // Chuyển giá thành số để sort
      const priceA = parseFloat(a.medicinePrice) || 0;
      const priceB = parseFloat(b.medicinePrice) || 0;
      return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
    } else if (sortField === "createTime" || sortField === "updateTime") {
      return sortDirection === "asc"
        ? new Date(a[sortField]) - new Date(b[sortField])
        : new Date(b[sortField]) - new Date(a[sortField]);
    }
    return 0;
  });

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = sortedMedicines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedMedicines.length / itemsPerPage);



  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center  mt-[5px]">
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Tìm theo tên thuốc..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={16} />
            Thêm thuốc
          </button>
        </div>
      </div>
      <div className="overflow-x-auto border border-gray-300 bg-white rounded-md shadow-sm">
        {sortedMedicines.length === 0 && !isLoading ? (
          <div className="text-center text-gray-600 p-6">
            Không có thuốc nào. Hãy thêm thuốc mới!
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                <th className="px-6 py-3">Hình ảnh</th>
                <th onClick={() => handleSort("name")} className="px-6 py-3 cursor-pointer">
                  <div className="flex items-center">
                    Tên thuốc <SortIcon field="name" />
                  </div>
                </th>
                <th onClick={() => handleSort("category")} className="px-6 py-3 cursor-pointer">
                  <div className="flex items-center">
                    Danh mục <SortIcon field="category" />
                  </div>
                </th>
                <th onClick={() => handleSort("dosageForm")} className="px-6 py-3 cursor-pointer">
                  <div className="flex items-center">
                    Dạng bào chế <SortIcon field="dosageForm" />
                  </div>
                </th>
                <th onClick={() => handleSort("createTime")} className="px-6 py-3 cursor-pointer">
                  <div className="flex items-center">
                    Ngày tạo <SortIcon field="createTime" />
                  </div>
                </th>
                <th onClick={() => handleSort("updateTime")} className="px-6 py-3 cursor-pointer">
                  <div className="flex items-center">
                    Ngày cập nhật <SortIcon field="updateTime" />
                  </div>
                </th>
                <th onClick={() => handleSort("medicinePrice")} className="px-6 py-3 cursor-pointer">
                  <div className="flex items-center">
                    Đơn giá <SortIcon field="medicinePrice" />
                  </div>
                </th>
                <th onClick={() => handleSort("status")} className="px-6 py-3 cursor-pointer">
                  <div className="flex items-center">
                    Trạng thái <SortIcon field="status" />
                  </div>
                </th>

                <th className="px-6 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentMedicines.map((medicine) => (
                <tr key={medicine.medicineId} value={medicine.medicineId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {medicine.avatarUrl ? (
                      <img
                        src={medicine.avatarUrl}
                        alt="Thuốc"
                        className="w-10 h-10 object-cover rounded shadow-lg"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                        Ảnh
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-800">{medicine.medicineName}</div>
                    <div className="text-xs text-gray-500">{medicine.description}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{medicine.medicineCategoryName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{medicine.dosageFormName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDateTime(medicine.createTime)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDateTime(medicine.updateTime)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{medicine.medicinePrice}</td>


                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${medicine.medicineStatus === "Đang bán"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                    >
                      {medicine.medicineStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button
                      onClick={() => onEdit(medicine)}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                      title="Sửa thuốc"
                    >
                      <Edit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-700" title="Xóa thuốc"
                      onClick={async () => {
                        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
                        if (confirmDelete) {
                          await deleteMedicine(medicine.medicineId);
                          fetchMedicines();
                        }
                      }}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-end mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          <ArrowLeft />
        </button>
        <span className="px-4 py-1">Trang {currentPage} / {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          <ArrowRight />
        </button>
      </div>
      {/* Modal Thêm thuốc */}
      {showAddModal && <AddMedcine onClose={() =>
        setShowAddModal(false)}
        onSuccess={() => {
          fetchMedicines();
          setShowAddModal(false);
        }} />}


      {/* Modal Sửa thuốc */}
      {showEditModal && (
        <EditMedcine
          medicine={selectedMedicine}
          onClose={() => {
            setShowEditModal(false);
          }}
          onSuccess={() => {
            fetchMedicines();
            setShowEditModal(false);
          }} />
      )}
    </div>
  );
}
