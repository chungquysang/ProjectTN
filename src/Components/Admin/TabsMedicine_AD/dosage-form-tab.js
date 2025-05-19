"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, ArrowUp, ArrowDown, Search, ArrowLeft, ArrowRight } from "lucide-react";
import { getDosage, deleteDosage } from "../../../services/API/DosageMedicine";
import { Adddosge, Editdosge, } from "../Modal/controllerRouter";

export default function DosageFromTab() {
  const [dosageForms, setDosageForms] = useState([]);
  const [sortField, setSortField] = useState("name");
  const [sort, setSort] = useState("asc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDosage, setSelectedDosage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state

  useEffect(() => {
    fetchDosages();
  }, []);

  const fetchDosages = async () => {
    setIsLoading(true); // Set loading to true when fetching data
    try {
      const data = await getDosage();
      setDosageForms(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách dạng bào chế:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSort(sort === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSort("asc");
    }
  };

  const handleEdit = (dosage) => {
    setSelectedDosage(dosage);
    setShowEditModal(true);
  };

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

  const sortedDosages = [...dosageForms].sort((a, b) => {
    const valA = sortField === "name" ? a.name : a[sortField];
    const valB = sortField === "name" ? b.name : b[sortField];

    if (sort === "asc") {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });

  const filteredCategories = sortedDosages.filter((dosage) =>
    dosage.dosageFormName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredCategories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sort === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6 mt-[5px]">
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Tìm kiếm tên dạng bào chế .... "
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <span>+</span> Thêm danh mục
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-300 bg-white rounded-md shadow-sm max-h-[400px] overflow-y-auto">
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">Đang tải dữ liệu...</div> // Show loading message
        ) : dosageForms.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Không có dạng bào chế nào. Hãy thêm dạng bào chế mới.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                <th
                  className="px-6 py-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Tên dạng bào chế
                    <SortIcon field="name" />
                  </div>
                </th>
                <th
                  className="px-6 py-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("createTime")}
                >
                  <div className="flex items-center">
                    Ngày tạo
                    <SortIcon field="createTime" />
                  </div>
                </th>
                <th
                  className="px-6 py-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("updateTime")}
                >
                  <div className="flex items-center">
                    Ngày cập nhật
                    <SortIcon field="updateTime" />
                  </div>
                </th>
                <th className="px-6 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentData.map((dosageForm) => (
                <tr key={dosageForm.dosageFormId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                    {dosageForm.dosageFormName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDateTime(dosageForm.createTime)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDateTime(dosageForm.updateTime)}
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <button
                      onClick={() => handleEdit(dosageForm)}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                      title="Sửa dạng bào chế"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      title="Xóa dạng bào chế"
                      onClick={async () => {
                        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa đạng điều chế này?");
                        if (confirmDelete) {
                          await deleteDosage(dosageForm.dosageFormId);
                          fetchDosages()
                        }
                      }}
                    >

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

      {showAddModal && (
        <Adddosge
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            fetchDosages();
            setShowAddModal(false);
          }}
        />
      )}

      {showEditModal && selectedDosage && (
        <Editdosge
          dosageForm={selectedDosage}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            fetchDosages();
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}
