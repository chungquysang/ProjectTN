import React from 'react';

export default function DiagnosisTab() {
    return (
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-sm space-y-6">
            {/* Triệu chứng và Yêu cầu xét nghiệm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Triệu chứng */}
                <div>
                    <label className="font-medium block mb-1">Triệu chứng</label>
                    <textarea
                        placeholder="Nhập triệu chứng của bệnh nhân..."
                        rows={4}
                        className="w-full border rounded-md p-2"
                    />
                </div>

                {/* Yêu cầu xét nghiệm */}
                <div>
                    <label className="font-medium block mb-1">Yêu cầu xét nghiệm</label>
                    <div className="border rounded-md p-4 space-y-2">
                        <p className="font-semibold mb-2">Danh sách xét nghiệm</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <label><input type="checkbox" className="mr-2" />Xét nghiệm máu</label>
                            <label><input type="checkbox" className="mr-2" />Xét nghiệm nước tiểu</label>
                            <label><input type="checkbox" className="mr-2" />X-quang</label>
                            <label><input type="checkbox" className="mr-2" />Siêu âm</label>
                            <label><input type="checkbox" className="mr-2" />CT-Scan</label>
                            <label><input type="checkbox" className="mr-2" />MRI</label>
                        </div>
                        <button className="text-blue-600 text-sm hover:underline mt-2">
                            + Thêm xét nghiệm
                        </button>
                    </div>
                </div>
            </div>

            {/* Chẩn đoán */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="font-medium block mb-1">Mã ICD-10</label>
                    <input
                        type="text"
                        placeholder="Nhập hoặc tìm kiếm mã ICD-10..."
                        className="w-full border rounded-md p-2 mb-4"
                    />

                    <label className="font-medium block mb-1">Chi tiết chẩn đoán</label>
                    <textarea
                        placeholder="Mô tả chi tiết tình trạng bệnh của bệnh nhân..."
                        rows={4}
                        className="w-full border rounded-md p-2"
                    />
                </div>

                {/* Ghi chú */}
                <div>
                    <label className="font-medium block mb-1">Ghi chú</label>
                    <textarea
                        placeholder="Nhập ghi chú về tình trạng bệnh nhân và hướng dẫn theo dõi..."
                        rows={9}
                        className="w-full border rounded-md p-2"
                    />
                </div>
            </div>

            {/* Chỉ định điều trị */}
            <div>
                <p className="font-medium mb-2">Chỉ định điều trị</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <label><input type="checkbox" className="mr-2" />Kê đơn thuốc</label>
                    <label><input type="checkbox" className="mr-2" />Yêu cầu xét nghiệm thêm</label>
                    <label><input type="checkbox" className="mr-2" />Chỉ định nhập viện</label>
                    <label><input type="checkbox" className="mr-2" defaultChecked />Điều trị ngoại trú</label>
                </div>
            </div>

            {/* Buttons */}
            {/* <div className="flex justify-end gap-4 pt-4">
                <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100">
                    Hủy
                </button>
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                    Kê đơn thuốc
                </button>
            </div> */}
        </div>
    );
}
