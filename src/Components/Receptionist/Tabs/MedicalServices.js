import React from "react";

const departmentServices = {
    "Khám Ngoại": [
        { group: "Ngoại tổng quát", items: [{ id: 1, name: "Khám xương khớp", price: 200000 }] },
        { group: "Phẫu thuật", items: [{ id: 2, name: "Tư vấn phẫu thuật", price: 300000 }] },
    ],
    "Khám Nội": [
        { group: "Nội tổng quát", items: [{ id: 3, name: "Khám tim mạch", price: 180000 }] },
        { group: "Tiêu hóa", items: [{ id: 4, name: "Khám tiêu hóa", price: 220000 }] },
    ],
    "Khám Tai Mũi Họng": [
        { group: "TMH cơ bản", items: [{ id: 5, name: "Khám tai", price: 150000 }, { id: 6, name: "Khám mũi", price: 150000 }] },
    ],
    "Khám Nhi": [
        { group: "Nhi tổng quát", items: [{ id: 7, name: "Khám sức khỏe trẻ em", price: 160000 }] },
    ],
    "Khám Phụ Khoa": [
        { group: "Phụ khoa", items: [{ id: 8, name: "Khám sản phụ", price: 250000 }] },
    ],
    "Khám Răng Hàm Mặt": [
        { group: "Nha khoa", items: [{ id: 9, name: "Khám răng tổng quát", price: 170000 }] },
    ],
    "Khám Mắt": [
        { group: "Mắt", items: [{ id: 10, name: "Khám thị lực", price: 180000 }] },
    ],
};

export default function MedicalServices({ selected, setSelected, selectedDepartment }) {
    const services = departmentServices[selectedDepartment] || [];

    const toggleService = (item) => {
        const exists = selected.find((s) => s.id === item.id);
        if (exists) {
            setSelected(selected.filter((s) => s.id !== item.id));
        } else {
            setSelected([...selected, item]);
        }
    };

    return (
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-base font-semibold text-gray-700 mb-4">
                Dịch vụ khám bệnh ({selectedDepartment})
            </h2>

            {services.length === 0 ? (
                <p className="text-gray-400">Không có dịch vụ nào cho khoa này.</p>
            ) : (
                services.map((group) => (
                    <div key={group.group} className="space-y-2 mb-4">
                        <h3 className="font-medium text-gray-600">{group.group}</h3>
                        {group.items.map((item) => {
                            const isChecked = selected.some((s) => s.id === item.id);
                            return (
                                <label
                                    key={item.id}
                                    className={`flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer transition 
                                        ${isChecked ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => toggleService(item)}
                                            className="form-checkbox text-blue-600"
                                        />
                                        <span className="text-gray-700">{item.name}</span>
                                    </div>
                                    <span className="text-gray-700 font-medium">
                                        {item.price.toLocaleString("vi-VN")} đ
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                ))
            )}
        </div>
    );
}
