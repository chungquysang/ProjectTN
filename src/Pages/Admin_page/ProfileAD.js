"use client";

import { useState } from "react";
import {
  SidebarAdmin,
  HeaderAdmin,
} from "../../Components/Admin/controllerRouter";

import {
  ProfileAvatar,
  ProfileInfo,
} from "../../Components/Admin/TabsProfileAD/controllerRouter";
// Hàm tạo dữ liệu mẫu
function ProfileAD() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="flex-1 overflow-y-auto p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
            <p className="text-sm text-gray-500 mt-1">
              Quản lý thông tin cá nhân và tài khoản của bạn
            </p>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Left Column - Avatar */}
                <div className="md:col-span-1">
                  <ProfileAvatar />
                </div>

                {/* Right Column - Info */}
                <div className="md:col-span-3">
                  <ProfileInfo
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default ProfileAD;
