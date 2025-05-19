"use client";

import { useState } from "react";
import { addDosage } from "../../../services/API/DosageMedicine";

export function Adddosge({ onClose, onSuccess }) {
  const [dosageFormName, setDosageFormName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!dosageFormName.trim()) {
      setError("Vui lòng nhập tên dạng bào chế");
      return;
    }
    try {
      const data = [{ dosageFormName: dosageFormName.trim() }];
      const result = await addDosage(data);
      console.log("Phản hồi từ API:", result);
      alert("Thêm thành công");
      setDosageFormName("");
      onSuccess();// chỉ gọi sau khi thêm thành công
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
      setError("Thêm danh mục thất bại");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Thêm dạng bào chế mới
                </h3>
                <div className="mt-2">
                  <div className="mb-4">
                    <label
                      htmlFor="dosageFormName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tên dạng bào chế<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="dosageFormName"
                      placeholder="Nhập tên dạng bào chế"
                      className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      value={dosageFormName}
                      onChange={(e) => {
                        setDosageFormName(e.target.value);
                        setError("");
                      }}
                      onKeyDown={handleKeyDown}
                      autoFocus
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-500">{error}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit}
            >
              Thêm
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Adddosge