"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, ArrowUp, ArrowDown, Plus, ArrowLeft, ArrowRight, Search, AlertTriangle } from "lucide-react";
import { getMedcineWarehoure } from "../../../services/API/inventory";
import { AddInventory, EditInventory, } from "../Modal/controllerRouter";

export function InventoryTab() {
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetchMedicinesWarehoure();
  }, []);


  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleEdit = (medicineWarehouse) => {
    setSelectedItem(medicineWarehouse);
    setShowEditModal(true);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const fetchMedicinesWarehoure = async () => {
    setIsLoading(true); // Set loading to true when fetching data
    try {
      const data = await getMedcineWarehoure();
      // console.log("data", data)
      setInventoryItems(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách dạng bào chế:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
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

  const filteredItems = inventoryItems.filter((item) =>
    item.medicineName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sắp xếp
  const sortedInventoryItems = [...filteredItems].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.medicineName.localeCompare(b.medicineName)
        : b.medicineName.localeCompare(a.medicineName);
    } else if (sortField === "quantity") {
      return sortDirection === "asc"
        ? a.medicineQuantity - b.medicineQuantity
        : b.medicineQuantity - a.medicineQuantity;
    } else if (sortField === "importDate") {
      return sortDirection === "asc"
        ? new Date(a.dayOfEntry) - new Date(b.dayOfEntry)
        : new Date(b.dayOfEntry) - new Date(a.dayOfEntry);
    } else if (sortField === "expiryDate") {
      return sortDirection === "asc"
        ? new Date(a.medicineExpirationDay) - new Date(b.medicineExpirationDay)
        : new Date(b.medicineExpirationDay) - new Date(a.medicineExpirationDay);
    } else if (sortField === "updateTime") {
      return sortDirection === "asc"
        ? new Date(a.updateTime) - new Date(b.updateTime)
        : new Date(b.updateTime) - new Date(a.updateTime);
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedInventoryItems.length / itemsPerPage);

  const paginatedItems = sortedInventoryItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Sửa logic hết hạn & sắp hết hạn
  const isExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };



  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

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


      <div className="overflow-x-auto border-b border-gray-200 border border-gray-300 bg-white  rounded-md shadow-sm">
        {inventoryItems.length === 0 && !isLoading ? (
          <div className="text-center text-gray-600 p-6">
            Không có thuốc nào trong kho. Hãy nhập kho mới.
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
                    Tên thuốc
                    <SortIcon field="name" />
                  </div>
                </th>
                <th
                  className="px-6 py-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("quantity")}
                >
                  <div className="flex items-center">
                    Số lượng
                    <SortIcon field="quantity" />
                  </div>
                </th>
                <th
                  className="px-6 py-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("importDate")}
                >
                  <div className="flex items-center">
                    Ngày nhập
                    <SortIcon field="importDate" />
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
                <th
                  className="px-6 py-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("expiryDate")}
                >
                  <div className="flex items-center">
                    Hạn sử dụng
                    <SortIcon field="expiryDate" />
                  </div>
                </th>
                <th className="px-6 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => (
                <tr
                  key={item.medicineWarehouseId}
                  className={`hover:bg-gray-50 ${isExpired(item.medicineExpirationDay)
                      ? "bg-red-50"
                      : isExpiringSoon(item.medicineExpirationDay)
                        ? "bg-yellow-50"
                        : ""
                    }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                    {item.medicineName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.medicineQuantity < 10 ? (
                      <span className="text-red-500 font-medium">
                        {item.medicineQuantity} (Sắp hết)
                      </span>
                    ) : (
                      item.medicineQuantity
                    )}
                    /cái
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.dayOfEntry).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(item.updateTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {isExpired(item.medicineExpirationDay) ? (
                      <div className="flex items-center text-red-500">
                        <AlertTriangle size={16} className="mr-1" />
                        <span>
                          {new Date(item.medicineExpirationDay).toLocaleDateString("vi-VN")} (Đã hết hạn)
                        </span>
                      </div>
                    ) : isExpiringSoon(item.medicineExpirationDay) ? (
                      <div className="flex items-center text-yellow-600">
                        <AlertTriangle size={16} className="mr-1" />
                        <span>
                          {new Date(item.medicineExpirationDay).toLocaleDateString("vi-VN")} (Sắp hết hạn)
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500">
                        {new Date(item.medicineExpirationDay).toLocaleDateString("vi-VN")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                      title="Sửa thông tin kho"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      // onClick={() => onDelete(item)}
                      className="text-red-500 hover:text-red-700"
                      title="Xóa khỏi kho"
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
        <AddInventory
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            fetchMedicinesWarehoure();
            setShowAddModal(false);
          }}
        />
      )}

      {showEditModal && selectedItem && (
        <EditInventory
          medicine={selectedItem}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            fetchMedicinesWarehoure();
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}
export default InventoryTab;
