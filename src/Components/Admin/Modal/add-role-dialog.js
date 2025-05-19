"use client";

import { useState } from "react";
import { X, Check, Search } from "lucide-react";

function Addrole({
  open,
  permissions,
  onClose,
  onSave,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [searchPermission, setSearchPermission] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    permissions: "",
  });

  const filteredPermissions = permissions.filter(
    (p) =>
      p.name.toLowerCase().includes(searchPermission.toLowerCase()) ||
      p.description.toLowerCase().includes(searchPermission.toLowerCase())
  );

  const togglePermission = (permissionName) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionName)
        ? prev.filter((p) => p !== permissionName)
        : [...prev, permissionName]
    );
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", description: "", permissions: "" };

    if (!name.trim()) {
      newErrors.name = "Tên vai trò không được để trống";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Mô tả không được để trống";
      isValid = false;
    }

    if (selectedPermissions.length === 0) {
      newErrors.permissions = "Phải chọn ít nhất một quyền";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ name, description, permissions: selectedPermissions });
      setName("");
      setDescription("");
      setSelectedPermissions([]);
      setSearchPermission("");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Tạo vai trò mới</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <div className="mb-4">
              <label
                htmlFor="role-name"
                className="block text-sm font-medium mb-1"
              >
                Tên vai trò <span className="text-red-500">*</span>
              </label>
              <input
                id="role-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Bác sĩ, Lễ tân, Quản trị viên..."
                className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : ""
                  }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="role-description"
                className="block text-sm font-medium mb-1"
              >
                Mô tả <span className="text-red-500">*</span>
              </label>
              <textarea
                id="role-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả ngắn gọn về vai trò này"
                className={`w-full p-2 border rounded min-h-[80px] ${errors.description ? "border-red-500" : ""
                  }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Chọn quyền cho vai trò này{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm quyền..."
                  value={searchPermission}
                  onChange={(e) => setSearchPermission(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded w-full"
                />
              </div>

              <div
                className={`border rounded max-h-[200px] overflow-y-auto ${errors.permissions ? "border-red-500" : ""
                  }`}
              >
                {filteredPermissions.length > 0 ? (
                  filteredPermissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-start p-2 hover:bg-gray-50 border-b last:border-b-0"
                    >
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border cursor-pointer ${selectedPermissions.includes(permission.name)
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                          }`}
                        onClick={() => togglePermission(permission.name)}
                      >
                        {selectedPermissions.includes(permission.name) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div
                        className="ml-2 cursor-pointer"
                        onClick={() => togglePermission(permission.name)}
                      >
                        <div className="font-medium">
                          {permission.description}
                        </div>
                        <div className="text-xs text-gray-500">
                          {permission.name}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-gray-500">
                    Không tìm thấy quyền phù hợp
                  </div>
                )}
              </div>
              {errors.permissions && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.permissions}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Đã chọn {selectedPermissions.length} quyền
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 p-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Addrole