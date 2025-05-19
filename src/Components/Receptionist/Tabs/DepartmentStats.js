import React from "react";

const stats = [
    { name: "Khám Tổng Quát", total: 45, waiting: 12 },
    { name: "Khám Nội", total: 32, waiting: 8 },
    { name: "Khám Ngoại", total: 28, waiting: 5 },
    { name: "Khám Nhi", total: 25, waiting: 7 },
    { name: "Răng Hàm Mặt", total: 20, waiting: 4 },
    { name: "Tai Mũi Họng", total: 18, waiting: 6 },
];

export default function DepartmentStats() {
    return (
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow mb-[20px]">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Thống kê theo khoa</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {stats.map((dept, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
                    >
                        <h3 className="text-sm font-medium text-gray-700 mb-2">{dept.name}</h3>
                        <div className="flex justify-between text-xs text-gray-500">
                            <div>
                                <div className="text-[11px]">Tổng số</div>
                                <div className="text-lg font-semibold text-gray-900">{dept.total}</div>
                            </div>
                            <div>
                                <div className="text-[11px]">Đang chờ</div>
                                <div className="text-lg font-semibold text-blue-600">{dept.waiting}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
