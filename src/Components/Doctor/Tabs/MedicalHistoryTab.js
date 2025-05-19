import React from 'react';
import { AlertTriangle, XCircle } from 'lucide-react'; // icon library (có thể dùng Heroicons nếu thích)

export default function MedicalHistoryTab() {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm space-y-6 ">
            {/* Bệnh mãn tính */}
            <div>
                <h2 className="font-semibold text-lg mb-2">Bệnh mãn tính</h2>
                <ul className="space-y-1 text-gray-800">
                    <li className="flex items-center gap-2 text-yellow-600">
                        <AlertTriangle size={16} /> Tăng huyết áp
                    </li>
                    <li className="flex items-center gap-2 text-yellow-600">
                        <AlertTriangle size={16} /> Đái tháo đường type 2
                    </li>
                    <li className="flex items-center gap-2 text-yellow-600">
                        <AlertTriangle size={16} /> Rối loạn lipid máu
                    </li>
                </ul>
            </div>

            {/* Dị ứng thuốc */}
            <div>
                <h2 className="font-semibold text-lg mb-2">Dị ứng thuốc</h2>
                <ul className="space-y-1 text-red-600">
                    <li className="flex items-center gap-2">
                        <XCircle size={16} /> Penicillin
                    </li>
                    <li className="flex items-center gap-2">
                        <XCircle size={16} /> Aspirin
                    </li>
                    <li className="flex items-center gap-2">
                        <XCircle size={16} /> Hải sản
                    </li>
                </ul>
            </div>

            {/* Lịch sử phẫu thuật */}
            <div>
                <h2 className="font-semibold text-lg mb-2">Lịch sử phẫu thuật</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm text-gray-700">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="border px-4 py-2 text-left">Ngày</th>
                                <th className="border px-4 py-2 text-left">Phẫu thuật</th>
                                <th className="border px-4 py-2 text-left">Bác sĩ</th>
                                <th className="border px-4 py-2 text-left">Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">2020-05-15</td>
                                <td className="border px-4 py-2">Phẫu thuật ruột thừa</td>
                                <td className="border px-4 py-2">Bs. Nguyễn Văn A</td>
                                <td className="border px-4 py-2">Phẫu thuật thành công, hồi phục tốt</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Ghi chú của bác sĩ */}
            <div>
                <h2 className="font-semibold text-lg mb-2">Ghi chú của bác sĩ</h2>
                <div className="p-4 border rounded-md bg-gray-50 text-gray-800">
                    Bệnh nhân cần theo dõi huyết áp và đường huyết thường xuyên
                </div>
            </div>
        </div>
    );
}
