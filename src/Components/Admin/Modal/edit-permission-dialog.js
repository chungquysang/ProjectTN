"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

function Editpermission({
  open,
  permission,
  onClose,
  onSave,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ name: "", description: "" });

  useEffect(() => {
    if (permission) {
      setName(permission.name);
      setDescription(permission.description);
    }
  }, [permission]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", description: "" };

    if (!name.trim()) {
      newErrors.name = "Tên quyền không được để trống";
      isValid = false;
    } else if (!/^[a-z0-9_]+$/.test(name)) {
      newErrors.name =
        "Tên quyền chỉ được chứa chữ thường, số và dấu gạch dưới";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Mô tả không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ ...permission, name, description });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Chỉnh sửa quyền</h2>
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
                htmlFor="permission-name"
                className="block text-sm font-medium mb-1"
              >
                Tên quyền <span className="text-red-500">*</span>
              </label>
              <input
                id="permission-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: view_user, edit_medicine, manage_appointment"
                className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : ""
                  }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Sử dụng ký tự chữ thường, số và dấu gạch dưới.
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="permission-description"
                className="block text-sm font-medium mb-1"
              >
                Mô tả <span className="text-red-500">*</span>
              </label>
              <textarea
                id="permission-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả ngắn gọn về quyền này"
                className={`w-full p-2 border rounded min-h-[100px] ${errors.description ? "border-red-500" : ""
                  }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
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
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Editpermission