import React, { useState, useRef } from "react";
import { Upload } from "lucide-react";

function ProfileAvatar() {
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center">
      <div className="relative inline-block">
        {/* Avatar Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-3 mx-auto border-2 border-gray-200">
          {avatar ? (
            <img
              src={avatar}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg
                className="w-16 h-16"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* User Name and Role */}
        <h3 className="text-lg font-medium">Nguyễn Văn Admin</h3>
        <p className="text-sm text-gray-500">Quản trị viên</p>

        {/* Upload Section */}
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Cập nhật ảnh đại diện</p>
          <button
            onClick={handleChooseImage}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="mr-2 h-4 w-4" />
            Chọn ảnh
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/jpeg, image/png, image/gif"
            className="hidden"
          />
          <p className="mt-1 text-xs text-gray-500">
            Chấp nhận JPG, PNG hoặc GIF có kích thước tối đa 1MB
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileAvatar;
