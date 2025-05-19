"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Search } from "lucide-react";
import { getCategory, deleteCategory } from "../../../services/API/MedicineCategory";
import { AddCategory, EditCategory } from "../Modal/controllerRouter";



export default function CategoryTab() {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [categoriesData, setCategoriesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;


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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategory();
      // console.log("category", data)
      setCategoriesData(data);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
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

  const sortedCategories = [...categoriesData].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.medicineCategoryName.localeCompare(b.medicineCategoryName)
        : b.medicineCategoryName.localeCompare(a.medicineCategoryName);
    } else if (sortField === "createTime" || sortField === "updateTime") {
      return sortDirection === "asc"
        ? new Date(a[sortField]) - new Date(b[sortField])
        : new Date(b[sortField]) - new Date(a[sortField]);
    }
    return 0;
  });

  const normalizeText = (text) =>
    text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const filteredCategories = sortedCategories.filter((category) =>
    normalizeText(category.medicineCategoryName).toLowerCase().includes(normalizeText(searchQuery).toLowerCase())
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
    return sortDirection === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (!categoriesData || categoriesData.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Không có danh mục nào. Hãy thêm danh mục mới.
      </div>
    );
  }

  const handleEdit = (category) => {
    console.log("Edit category:", category); // thêm dòng này để kiểm tra
    setSelectedCategory(category);
    setShowEditCategoryModal(true);
  };

  return (

    <div>
      <div className="flex justify-between items-center mb-6 mt-[5px]">
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Tìm kiếm tên danh mục .... "
            value={searchQuery}  // Đưa giá trị tìm kiếm vào input
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddCategoryModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <span>+</span> Thêm danh mục
          </button>

        </div>
      </div>
      <div className="overflow-x-auto border border-gray-300 bg-white rounded-md shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
              <th
                className="px-6 py-3 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Tên danh mục
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
            {currentData.map((category) => (
              <tr key={category.medicineCategoryId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                  {category.medicineCategoryName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDateTime(category.createTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDateTime(category.updateTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-500 hover:text-blue-700 mr-3"
                    title="Sửa danh mục"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={async () => {
                      const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
                      if (confirmDelete) {
                        await deleteCategory(category.medicineCategoryId);
                        fetchCategories();
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                    title="Xóa danh mục"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Phân trang */}
      <div className="w-full border-t border-gray-200">
        <div className="flex justify-end items-center px-6 py-4 ">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`mr-[20px] px-1 py-1 rounded-md border ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
          >
            <ArrowLeft />
          </button>
          <span className="text-sm text-gray-600">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`ml-[20px] px-1 py-1 rounded-md border ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
          >
            <ArrowRight />
          </button>
        </div>
        {showAddCategoryModal && (
          <AddCategory
            onClose={() => setShowAddCategoryModal(false)}
            onSuccess={() => {
              fetchCategories();
              setShowAddCategoryModal(false);
            }}
          />
        )}

        {showEditCategoryModal && (
          <EditCategory
            categoryData={selectedCategory}
            onClose={() => setShowEditCategoryModal(false)}
            onSuccess={() => {
              fetchCategories();
              setShowEditCategoryModal(false);
            }}
          />
        )}
      </div>
    </div >
  );
}
