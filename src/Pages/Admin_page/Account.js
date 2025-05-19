"use client";

import {
  SidebarAdmin,
  HeaderAdmin,
} from "../../Components/Admin/controllerRouter";
import { Search, Filter, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

import { AddAccount, EditAccount } from "../../Components/Admin/Modal/controllerRouter"

import { getAllUsersByPage, getAlltotalpage } from "../../services/API/User";

function Account() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");  // Thêm state cho tìm kiếm
  const [filteredUsers, setFilteredUsers] = useState([]);

  function formatCreateAt(arr) {
    if (!Array.isArray(arr) || arr.length < 6) return "Invalid date";

    const [year, month, day, hour, minute, second] = arr;

    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(day)}/${pad(month)}/${year} ${pad(hour)}:${pad(minute)}:${pad(second)}`;
  }
  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const { totalPages } = await getAlltotalpage(); // chỉ gọi 1 lần
        setTotalPages(totalPages);
      } catch (err) {
        setError("Không thể lấy tổng số trang");
      }
    };
    fetchTotalPages();
  }, []);

  useEffect(() => {
    const fetchUsersByPage = async () => {
      setLoading(true);
      try {
        const usersData = await getAllUsersByPage(pageNumber - 1);
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải dữ liệu người dùng theo trang");
        setLoading(false);
      }
    };
    if (totalPages > 0) fetchUsersByPage(); // chỉ gọi nếu đã có totalPages
  }, [pageNumber, totalPages]);

  const handleToggleStatus = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userId === userId ? { ...user, active: !user.active } : user
      )
    );
  };
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersData = await getAllUsersByPage(pageNumber - 1);
        setUsers(usersData);
        setFilteredUsers(usersData); // Cập nhật filteredUsers
        setLoading(false);
      } catch (err) {
        setError("Không thể tải dữ liệu người dùng");
        setLoading(false);
      }
    };
    fetchUsers();
  }, [pageNumber]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase(); // Chuyển thành chữ thường để tìm kiếm không phân biệt hoa thường
    setSearchQuery(query);

    // Tìm kiếm trong danh sách người dùng
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(query)
    );

    setFilteredUsers(filtered); // Cập nhật filteredUsers
  };
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Quản lý người dùng
            </h1>
            <p className="text-gray-500">
              Quản lý thông tin người dùng trong hệ thống
            </p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={searchQuery}  // Đưa giá trị tìm kiếm vào input
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
            <div className="flex gap-2">
              <button className="p-2 border rounded-lg hover:bg-gray-100">
                <Filter size={20} className="text-gray-500" />
              </button>
              {/* <button
                className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2"
                onClick={() => setIsAddModalOpen(true)}
              >
                <span>+</span> Thêm người dùng
              </button> */}
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-auto max-h-[70vh]">
            <div className="bg-white rounded-lg shadow overflow-hidden w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ẢNH
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      HỌ TÊN
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      EMAIL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SỐ ĐIỆN THOẠI
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NGÀY TẠO
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NGÀY CẬP NHẬT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      VAI TRÒ
                    </th>
                    <th className=" w-[300px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TRẠNG THÁI
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      THAO TÁC
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(searchQuery ? filteredUsers : users).map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                          Ảnh
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.username}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-600">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCreateAt(user.create_at)}
                        </div>

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-600">{formatCreateAt(user.update_at)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-600">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {user.role || user.roles?.[0]?.description}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap w-[250px]">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={user.active}
                            onChange={() => handleToggleStatus(user.userId)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900">
                            {user.active ? "Hoạt động" : "Không hoạt động"}
                          </span>
                        </label>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditModalOpen(true);
                            }}
                          >
                            <Edit size={18} />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pagination mt-4 flex justify-end">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;

                // Luôn hiển thị trang 1 và trang cuối
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= pageNumber - 1 && page <= pageNumber + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setPageNumber(page)}
                      className={`px-3 py-1 rounded border ${pageNumber === page ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                    >
                      {page}
                    </button>
                  );
                }

                // Hiển thị dấu ... sau trang 1 nếu gần trang 4
                if (page === 2 && pageNumber > 3) {
                  return (
                    <span key="start-dots" className="px-3 py-1 select-none">...</span>
                  );
                }

                // Hiển thị dấu ... trước trang cuối nếu cách xa
                if (page === totalPages - 1 && pageNumber < totalPages - 2) {
                  return (
                    <span key="end-dots" className="px-3 py-1 select-none">...</span>
                  );
                }

                return null; // Ẩn các trang không cần thiết
              })}
            </div>
          </div>
        </main>

        {isAddModalOpen && (
          <AddAccount onClose={() => setIsAddModalOpen(false)} />
        )}
        {isEditModalOpen && selectedUser && (
          <EditAccount
            user={selectedUser}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Account;
