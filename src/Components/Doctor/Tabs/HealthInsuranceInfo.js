import { CalendarDays, AlertTriangle } from "lucide-react";

export default function HealthInsuranceInfo() {
    return (
        <div className="max-w p-6 bg-white rounded-xl shadow-sm">
            <div className="flex items-center mb-4 bg-yellow-50 border border-yellow-300 p-4 rounded-md">
                <AlertTriangle className="text-yellow-500 mr-2" />
                <p className="text-sm text-yellow-700">
                    Thẻ BHYT đã hết hạn. Vui lòng hướng dẫn bệnh nhân gia hạn thẻ BHYT.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm text-gray-700">
                <div>
                    <p className="font-medium">Số thẻ BHYT</p>
                    <p>BH123456789</p>
                </div>
                <div>
                    <p className="font-medium">Tỉ lệ thanh toán BHYT</p>
                    <p>80%</p>
                </div>
                <div className="flex items-center space-x-2">
                    <CalendarDays className="text-gray-500 w-4 h-4" />
                    <div>
                        <p className="font-medium">Ngày bắt đầu</p>
                        <p>2023-01-01</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <CalendarDays className="text-gray-500 w-4 h-4" />
                    <div>
                        <p className="font-medium">Ngày kết thúc</p>
                        <p>2023-12-31</p>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <p className="font-medium">Ghi chú</p>
                    <p>Bảo hiểm y tế nhà nước</p>
                </div>
            </div>
        </div>
    );
}
