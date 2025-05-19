import { useState } from "react"
import Siderbar from "../../Components/Siderbar";
import Header from "../../Components/Header";
import { Stethoscope, ClipboardList, CalendarDays } from "lucide-react";



const Reports = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const doctorInfo = {
        name: "BS. Nguyễn Văn A",
        department: "Nội khoa",
        date: "24/04/2025",
    };

    const stats = [
        { label: "Tổng lượt khám", value: 128 },
        { label: "Bệnh nhân mới", value: 52 },
        { label: "Tái khám", value: 76 },
        { label: "Đơn thuốc đã kê", value: 122 },
        { label: "Hướng dẫn xét nghiệm", value: 58 },
        { label: "Hẹn tái khám", value: 41 },
    ];

    const notes = [
        "Bệnh cấp tính chiếm tỉ lệ cao.",
        "Chuyển cận lâm sàng khi cần thiết.",
        "Không có trường hợp nhập viện.",
        "Bệnh nhân tuân thủ tốt điều trị.",
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {sidebarOpen && <Siderbar />}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    isSidebarOpen={sidebarOpen}
                />        <main className="p-6 overflow-auto h-full">
                    <div className="flex space-x-6 h-full">
                        <div className=" mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
                            {/* Header */}
                            <div className="flex items-center gap-3 text-blue-600 text-2xl font-bold">
                                <Stethoscope size={28} />
                                Báo Cáo Thống Kê Khám Bệnh
                            </div>

                            {/* Doctor Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                                <div><strong>Bác sĩ:</strong> {doctorInfo.name}</div>
                                <div><strong>Khoa:</strong> {doctorInfo.department}</div>
                                <div className="flex items-center gap-1">
                                    <CalendarDays size={16} />
                                    <span><strong>Ngày báo cáo:</strong> {doctorInfo.date}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {stats.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-blue-50 p-4 rounded-lg shadow text-center border border-blue-100"
                                    >
                                        <div className="text-xl font-bold text-blue-700">{item.value}</div>
                                        <div className="text-sm text-gray-600">{item.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Notes */}
                            <div>
                                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
                                    <ClipboardList size={20} />
                                    Ghi chú chuyên môn
                                </div>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    {notes.map((note, idx) => (
                                        <li key={idx}>{note}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Footer */}
                            <div className="text-right text-sm text-gray-500 italic mt-6">
                                Ngày lập báo cáo: {doctorInfo.date}
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    )
}
export default Reports;