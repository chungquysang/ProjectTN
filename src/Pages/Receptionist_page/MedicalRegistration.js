import { useState } from "react";
import Siderbar from "../../Components/Siderbar";
import Header from "../../Components/Header";
import { MedicalServices, DepartmentStats } from "../../Components/Receptionist/Tabs/controllerRouter";
import { Building2, HeartPulse, Ear, Baby, Smile, Eye } from 'lucide-react';

const MedicalRegistration = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState("Khám Ngoại");
    const [selectedServices, setSelectedServices] = useState([]);

    const departments = [
        { name: "Khám Ngoại", description: "Khám và điều trị các bệnh ngoại khoa", icon: <Building2 className="w-10 h-10 text-blue-600" /> },
        { name: "Khám Nội", description: "Khám và điều trị các bệnh nội khoa", icon: <HeartPulse className="w-10 h-10 text-red-500" /> },
        { name: "Khám Tai Mũi Họng", description: "Khám và điều trị tai mũi họng", icon: <Ear className="w-10 h-10 text-green-500" /> },
        { name: "Khám Nhi", description: "Khám và điều trị cho trẻ em", icon: <Baby className="w-10 h-10 text-pink-500" /> },
        { name: "Khám Phụ Khoa", description: "Khám và điều trị các bệnh phụ khoa", icon: <HeartPulse className="w-10 h-10 text-pink-400" /> },
        { name: "Khám Răng Hàm Mặt", description: "Khám và điều trị răng miệng", icon: <Smile className="w-10 h-10 text-yellow-500" /> },
        { name: "Khám Mắt", description: "Khám và điều trị các bệnh về mắt", icon: <Eye className="w-10 h-10 text-purple-500" /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {sidebarOpen && <Siderbar />}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isSidebarOpen={sidebarOpen} />
                <main className="p-6 overflow-auto h-full">
                    <div className="flex space-x-6 h-full">
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-6">Đăng ký khám bệnh</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* Form nhập thông tin bệnh nhân + chọn phòng khám */}
                                <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
                                    <h2 className="text-lg font-semibold mb-4">Thông tin bệnh nhân</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Họ và tên *</label>
                                            <input className="w-full border p-2 rounded" type="text" placeholder="Nhập họ tên" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Giới tính *</label>
                                            <div className="flex space-x-4 mt-2">
                                                <label className="flex items-center space-x-2">
                                                    <input type="radio" name="gender" value="Nam" defaultChecked />
                                                    <span>Nam</span>
                                                </label>
                                                <label className="flex items-center space-x-2">
                                                    <input type="radio" name="gender" value="Nữ" />
                                                    <span>Nữ</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Ngày sinh *</label>
                                            <input className="w-full border p-2 rounded" type="date" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Cấp hạng *</label>
                                            <input className="w-full border p-2 rounded" min={0} type="number" placeholder="Nhập cấp hạng" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                                            <input className="w-full border p-2 rounded" type="text" placeholder="Nhập địa chỉ" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Số Hiểm Y Tế</label>
                                            <input className="w-full border p-2 rounded" type="text" placeholder="Số bảo hiểm y tế" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-1">Phòng khám</label>
                                            <select
                                                className="w-full border p-2 rounded"
                                                value={selectedDepartment}
                                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                            >
                                                {departments.map((dept) => (
                                                    <option key={dept.name} value={dept.name}>
                                                        {dept.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Chọn phòng khám */}
                                    <div className="mt-8">
                                        <h2 className="text-lg font-semibold mb-4">Chọn phòng khám</h2>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            {departments.map((dept) => (
                                                <div
                                                    key={dept.name}
                                                    className={`flex flex-col items-center justify-center border p-6 rounded-2xl cursor-pointer transition 
                                                        transform hover:scale-105 duration-300 shadow-md
                                                        ${selectedDepartment === dept.name
                                                            ? "border-blue-500 bg-blue-50"
                                                            : "border-gray-300 hover:border-blue-300 hover:bg-blue-100"}`}
                                                    onClick={() => setSelectedDepartment(dept.name)}
                                                >
                                                    {dept.icon}
                                                    <h3 className="font-semibold text-center mt-3">{dept.name}</h3>
                                                    <p className="text-gray-500 text-sm text-center mt-2">{dept.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Tổng quan đăng ký */}
                                <div className="bg-white p-6 rounded-lg shadow h-fit">
                                    <h2 className="text-lg font-semibold mb-4">Tổng quan đăng ký</h2>
                                    <div className="mb-4">
                                        <p className="text-gray-700 mb-2">Phòng khám đã chọn:</p>
                                        <div className="border p-2 rounded text-blue-600 font-semibold">
                                            {selectedDepartment}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-gray-700 mb-2">Dịch vụ đã chọn:</p>
                                        {selectedServices.length === 0 ? (
                                            <p className="text-gray-400 text-sm">Chưa chọn dịch vụ khám</p>
                                        ) : (
                                            <ul className="list-disc pl-5 text-sm text-gray-700">
                                                {selectedServices.map((item) => (
                                                    <li key={item.id}>{item.name} - {item.price.toLocaleString("vi-VN")} đ</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition">
                                        Đăng ký khám bệnh
                                    </button>
                                    <button className="w-full border border-gray-300 mt-3 p-3 rounded hover:bg-gray-100 transition">
                                        Làm mới
                                    </button>
                                </div>

                                {/* Dịch vụ khám */}
                                <MedicalServices
                                    selected={selectedServices}
                                    setSelected={setSelectedServices}
                                    selectedDepartment={selectedDepartment}
                                />

                                <DepartmentStats />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MedicalRegistration;
