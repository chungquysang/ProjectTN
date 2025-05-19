"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Shield,
  Users,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import {
  SidebarAdmin,
  HeaderAdmin,
} from "../../Components/Admin/controllerRouter";

// import CreatePermissionDialog from "../../Components/Admin/Modal/create-permission-dialog";
// import EditPermissionDialog from "../../Components/Admin/Modal/edit-permission-dialog";
// import CreateRoleDialog from "../../Components/Admin/Modal/create-role-dialog";
// import EditRoleDialog from "../../Components/Admin/Modal/edit-role-dialog";
// import DeleteConfirmDialog from "../../Components/Admin/Modal/delete-confirm-dialog";

import { Addpermission, Editpermission, Addrole, Editrole, Deletedialog } from "../../Components/Admin/Modal/controllerRouter"


const permissions = [
  { id: 1, name: "view_user", description: "Xem thông tin người dùng" },
  { id: 2, name: "edit_medicine", description: "Chỉnh sửa thông tin thuốc" },
  { id: 3, name: "manage_appointment", description: "Quản lý lịch hẹn" },
  { id: 4, name: "view_medical_record", description: "Xem hồ sơ bệnh án" },
  {
    id: 5,
    name: "edit_medical_record",
    description: "Chỉnh sửa hồ sơ bệnh án",
  },
  { id: 6, name: "manage_staff", description: "Quản lý nhân viên" },
  { id: 7, name: "edit", description: "Sửa" },
];

const roles = [
  {
    id: 1,
    name: "Bác sĩ",
    description: "Quyền dành cho bác sĩ trong hệ thống",
    permissions: [
      "view_medical_record",
      "edit_medical_record",
      "view_user",
      "manage_appointment",
      "edit_medicine",
      "manage_staff",
    ],
  },
  {
    id: 2,
    name: "Lễ tân",
    description: "Quyền dành cho nhân viên lễ tân",
    permissions: ["view_user", "manage_appointment"],
  },
  {
    id: 3,
    name: "Quản trị viên",
    description: "Quyền dành cho quản trị viên hệ thống",
    permissions: [
      "view_user",
      "edit_medicine",
      "manage_appointment",
      "view_medical_record",
      "edit_medical_record",
      "manage_staff",
    ],
  },
  {
    id: 4,
    name: "Dược sĩ",
    description: "Quyền dành cho dược sĩ",
    permissions: ["view_user", "edit_medicine", "manage_appointment"],
  },
];

function RoleAdmin() {
  const [activeTab, setActiveTab] = useState("permissions");
  const [searchPermission, setSearchPermission] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [showCreatePermission, setShowCreatePermission] = useState(false);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [editPermission, setEditPermission] = useState(null);
  const [editRole, setEditRole] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    type: "",
    id: null,
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const [permissionFilters, setPermissionFilters] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [roleFilters, setRoleFilters] = useState({
    id: "",
    name: "",
    description: "",
  });

  // Lọc quyền dựa trên tìm kiếm và bộ lọc
  const filteredPermissions = permissions.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchPermission.toLowerCase()) ||
      p.description.toLowerCase().includes(searchPermission.toLowerCase());

    const matchFilters =
      (permissionFilters.id === "" ||
        p.id.toString().includes(permissionFilters.id)) &&
      (permissionFilters.name === "" ||
        p.name.toLowerCase().includes(permissionFilters.name.toLowerCase())) &&
      (permissionFilters.description === "" ||
        p.description
          .toLowerCase()
          .includes(permissionFilters.description.toLowerCase()));

    return matchSearch && matchFilters;
  });

  // Lọc vai trò dựa trên tìm kiếm và bộ lọc
  const filteredRoles = roles.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(searchRole.toLowerCase()) ||
      r.description.toLowerCase().includes(searchRole.toLowerCase());

    const matchFilters =
      (roleFilters.id === "" || r.id.toString().includes(roleFilters.id)) &&
      (roleFilters.name === "" ||
        r.name.toLowerCase().includes(roleFilters.name.toLowerCase())) &&
      (roleFilters.description === "" ||
        r.description
          .toLowerCase()
          .includes(roleFilters.description.toLowerCase()));

    return matchSearch && matchFilters;
  });

  // Xử lý thêm quyền mới
  const handleAddPermission = (newPermission) => {
    // Trong thực tế, bạn sẽ gọi API để thêm quyền mới
    // Ở đây chúng ta giả lập bằng cách thêm vào mảng permissions
    const newId = Math.max(...permissions.map((p) => p.id)) + 1;
    const permissionToAdd = { id: newId, ...newPermission };

    // Thêm quyền mới vào danh sách
    permissions.push(permissionToAdd);

    // Đóng modal và hiển thị thông báo
    setShowCreatePermission(false);
    showNotification("Thêm quyền mới thành công", "success");
  };

  // Xử lý cập nhật quyền
  const handleUpdatePermission = (updatedPermission) => {
    // Trong thực tế, bạn sẽ gọi API để cập nhật quyền
    // Ở đây chúng ta giả lập bằng cách cập nhật trong mảng permissions
    const index = permissions.findIndex((p) => p.id === updatedPermission.id);
    if (index !== -1) {
      permissions[index] = { ...permissions[index], ...updatedPermission };
    }

    // Đóng modal và hiển thị thông báo
    setEditPermission(null);
    showNotification("Cập nhật quyền thành công", "success");
  };

  // Xử lý thêm vai trò mới
  const handleAddRole = (newRole) => {
    // Trong thực tế, bạn sẽ gọi API để thêm vai trò mới
    const newId = Math.max(...roles.map((r) => r.id)) + 1;
    const roleToAdd = { id: newId, ...newRole };

    // Thêm vai trò mới vào danh sách
    roles.push(roleToAdd);

    // Đóng modal và hiển thị thông báo
    setShowCreateRole(false);
    showNotification("Thêm vai trò mới thành công", "success");
  };

  // Xử lý cập nhật vai trò
  const handleUpdateRole = (updatedRole) => {
    // Trong thực tế, bạn sẽ gọi API để cập nhật vai trò
    const index = roles.findIndex((r) => r.id === updatedRole.id);
    if (index !== -1) {
      roles[index] = { ...roles[index], ...updatedRole };
    }

    // Đóng modal và hiển thị thông báo
    setEditRole(null);
    showNotification("Cập nhật vai trò thành công", "success");
  };

  // Xử lý xóa quyền
  const handleDeletePermission = (id) => {
    setDeleteConfirm({ show: true, type: "permission", id });
  };

  // Xử lý xóa vai trò
  const handleDeleteRole = (id) => {
    setDeleteConfirm({ show: true, type: "role", id });
  };

  // Xác nhận xóa
  const confirmDelete = () => {
    if (deleteConfirm.type === "permission") {
      // Xóa quyền
      const index = permissions.findIndex((p) => p.id === deleteConfirm.id);
      if (index !== -1) {
        permissions.splice(index, 1);
        showNotification("Xóa quyền thành công", "success");
      }
    } else if (deleteConfirm.type === "role") {
      // Xóa vai trò
      const index = roles.findIndex((r) => r.id === deleteConfirm.id);
      if (index !== -1) {
        roles.splice(index, 1);
        showNotification("Xóa vai trò thành công", "success");
      }
    }

    // Đóng dialog xác nhận
    setDeleteConfirm({ show: false, type: "", id: null });
  };

  // Hiển thị thông báo
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });

    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Xử lý reset bộ lọc
  const resetFilters = () => {
    if (activeTab === "permissions") {
      setPermissionFilters({ id: "", name: "", description: "" });
    } else {
      setRoleFilters({ id: "", name: "", description: "" });
    }
    setFilterOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-2">Quản lý phân quyền</h1>
          <p className="text-gray-600 mb-6">
            Quản lý quyền và vai trò trong hệ thống
          </p>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab("permissions")}
              className={`flex items-center px-4 py-2 border-b-2 transition ${activeTab === "permissions"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600"
                }`}
            >
              <Shield className="w-4 h-4 mr-2" />
              Danh sách quyền
            </button>
            <button
              onClick={() => setActiveTab("roles")}
              className={`flex items-center px-4 py-2 border-b-2 transition ${activeTab === "roles"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600"
                }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Vai trò người dùng
            </button>
          </div>

          {/* Thông báo */}
          {notification.show && (
            <div
              className={`mb-4 p-3 rounded flex items-center justify-between ${notification.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
                }`}
            >
              <span>{notification.message}</span>
              <button
                onClick={() =>
                  setNotification({ ...notification, show: false })
                }
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {activeTab === "permissions" ? (
            <>
              {/* Search & Actions */}
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm quyền..."
                    value={searchPermission}
                    onChange={(e) => setSearchPermission(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 border rounded hover:bg-gray-100"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowCreatePermission(true)}
                    className="p-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo quyền mới
                  </button>
                </div>
              </div>

              {/* Bộ lọc nâng cao */}
              {filterOpen && (
                <div className="mb-4 p-4 border rounded bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Bộ lọc nâng cao</h3>
                    <button onClick={() => setFilterOpen(false)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        ID
                      </label>
                      <input
                        type="text"
                        value={permissionFilters.id}
                        onChange={(e) =>
                          setPermissionFilters({
                            ...permissionFilters,
                            id: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tên quyền
                      </label>
                      <input
                        type="text"
                        value={permissionFilters.name}
                        onChange={(e) =>
                          setPermissionFilters({
                            ...permissionFilters,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Mô tả
                      </label>
                      <input
                        type="text"
                        value={permissionFilters.description}
                        onChange={(e) =>
                          setPermissionFilters({
                            ...permissionFilters,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={resetFilters}
                      className="px-3 py-1 border rounded mr-2 hover:bg-gray-100"
                    >
                      Đặt lại
                    </button>
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              )}

              {/* Table Permissions */}
              <div className="overflow-x-auto border rounded">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium text-gray-500">
                        ID
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-500">
                        TÊN QUYỀN
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-500">
                        MÔ TẢ
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-gray-500">
                        THAO TÁC
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPermissions.map((p) => (
                      <tr key={p.id} className="border-t">
                        <td className="px-4 py-3">{p.id}</td>
                        <td className="px-4 py-3 font-medium">{p.name}</td>
                        <td className="px-4 py-3 text-gray-600">
                          {p.description}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditPermission(p)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePermission(p.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredPermissions.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center px-4 py-4 text-gray-400"
                        >
                          Không tìm thấy quyền phù hợp.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              {/* Search & Actions */}
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm vai trò..."
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 border rounded hover:bg-gray-100"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowCreateRole(true)}
                    className="p-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo vai trò mới
                  </button>
                </div>
              </div>

              {/* Bộ lọc nâng cao */}
              {filterOpen && (
                <div className="mb-4 p-4 border rounded bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Bộ lọc nâng cao</h3>
                    <button onClick={() => setFilterOpen(false)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        ID
                      </label>
                      <input
                        type="text"
                        value={roleFilters.id}
                        onChange={(e) =>
                          setRoleFilters({ ...roleFilters, id: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tên vai trò
                      </label>
                      <input
                        type="text"
                        value={roleFilters.name}
                        onChange={(e) =>
                          setRoleFilters({
                            ...roleFilters,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Mô tả
                      </label>
                      <input
                        type="text"
                        value={roleFilters.description}
                        onChange={(e) =>
                          setRoleFilters({
                            ...roleFilters,
                            description: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={resetFilters}
                      className="px-3 py-1 border rounded mr-2 hover:bg-gray-100"
                    >
                      Đặt lại
                    </button>
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              )}

              {/* Table Roles */}
              <div className="overflow-x-auto border rounded">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium text-gray-500">
                        ID
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-500">
                        TÊN VAI TRÒ
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-500">
                        MÔ TẢ
                      </th>
                      <th className="px-4 py-3 font-medium text-gray-500">
                        SỐ QUYỀN
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-gray-500 whitespace-nowrap">
                        THAO TÁC
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRoles.map((role) => (
                      <tr key={role.id} className="border-t">
                        <td className="px-4 py-3">{role.id}</td>
                        <td className="px-4 py-3 font-medium">{role.name}</td>
                        <td className="px-4 py-3 text-gray-600">
                          {role.description}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.map((p, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setEditRole(role)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRole(role.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredRoles.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center px-4 py-4 text-gray-400"
                        >
                          Không tìm thấy vai trò phù hợp.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Modals */}
          {showCreatePermission && (
            <Addpermission
              open={showCreatePermission}
              onClose={() => setShowCreatePermission(false)}
              onSave={handleAddPermission}
            />
          )}

          {editPermission && (
            <Editpermission
              open={!!editPermission}
              permission={editPermission}
              onClose={() => setEditPermission(null)}
              onSave={handleUpdatePermission}
            />
          )}

          {showCreateRole && (
            <Addrole
              open={showCreateRole}
              permissions={permissions}
              onClose={() => setShowCreateRole(false)}
              onSave={handleAddRole}
            />
          )}

          {editRole && (
            <Editrole
              open={!!editRole}
              role={editRole}
              permissions={permissions}
              onClose={() => setEditRole(null)}
              onSave={handleUpdateRole}
            />
          )}

          {deleteConfirm.show && (
            <Deletedialog
              open={deleteConfirm.show}
              type={deleteConfirm.type}
              onClose={() =>
                setDeleteConfirm({ show: false, type: "", id: null })
              }
              onConfirm={confirmDelete}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default RoleAdmin;
