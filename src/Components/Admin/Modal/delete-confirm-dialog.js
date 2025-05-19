"use client";

import { AlertTriangle } from "lucide-react";

function Deletedialog({
  open,
  type,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  const title = type === "permission" ? "Xóa quyền" : "Xóa vai trò";
  const message =
    type === "permission"
      ? "Bạn có chắc chắn muốn xóa quyền này? Hành động này không thể hoàn tác."
      : "Bạn có chắc chắn muốn xóa vai trò này? Hành động này không thể hoàn tác.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="p-4 bg-red-50 flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-red-700">{title}</h2>
        </div>

        <div className="p-4">
          <p className="text-gray-700">{message}</p>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  );
}
export default Deletedialog