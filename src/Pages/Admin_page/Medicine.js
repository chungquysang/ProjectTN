"use client";

import { useState } from "react";
import {
  SidebarAdmin,
  HeaderAdmin,
} from "../../Components/Admin/controllerRouter";
import {
  List,
  FlaskRoundIcon as Flask,
  Info,
  Package,
} from "lucide-react";

import { CategoryTab, DosageFromTab, Inventorytab, MedicineTab } from "../../Components/Admin/TabsMedicine_AD/controllerRouter";

function MedicineManagement() {
  const [activeTab, setActiveTab] = useState("Danh mục thuốc");

  // Render nội dung của tab dựa vào activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Danh mục thuốc":
        return <CategoryTab />;
      case "Dạng bào chế":
        return <DosageFromTab />;
      case "Thông tin thuốc":
        return <MedicineTab />;
      case "Kho thuốc":
        return <Inventorytab />;
      default:
        return <CategoryTab />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="foverflow-y-auto p-4">
          <div className="container mx-auto px-4 py-6 ">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý thuốc</h1>
            <p className="text-sm text-gray-600 mb-6">
              Quản lý thông tin thuốc, kho thuốc và danh mục thuốc
            </p>
            <div className="border border-gray-300 bg-white rounded-lg shadow-sm">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("Danh mục thuốc")}
                  className={`flex items-center py-4 px-6 ${activeTab === "Danh mục thuốc"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <List className="w-5 h-5 mr-2" />
                  <span>Danh mục thuốc</span>
                </button>

                <button
                  onClick={() => setActiveTab("Dạng bào chế")}
                  className={`flex items-center py-4 px-6 ${activeTab === "Dạng bào chế"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <Flask className="w-5 h-5 mr-2" />
                  <span>Dạng bào chế</span>
                </button>

                <button
                  onClick={() => setActiveTab("Thông tin thuốc")}
                  className={`flex items-center py-4 px-6 ${activeTab === "Thông tin thuốc"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <Info className="w-5 h-5 mr-2" />
                  <span>Thông tin thuốc</span>
                </button>

                <button
                  onClick={() => setActiveTab("Kho thuốc")}
                  className={`flex items-center py-4 px-6 ${activeTab === "Kho thuốc"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <Package className="w-5 h-5 mr-2" />
                  <span>Kho thuốc</span>
                </button>
              </nav>
            </div>

            {/* Render nội dung theo tab đã chọn */}
            <div className="mt-6">{renderTabContent()}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MedicineManagement;
