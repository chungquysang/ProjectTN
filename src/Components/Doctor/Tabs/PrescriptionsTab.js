import { useState } from "react";
import { Trash2, Printer, ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";

export default function PrescriptionsTab() {
    const [medications, setMedications] = useState([
        { name: "Paracetamol 500mg", dose: "1 viên", frequency: "3 lần/ngày", duration: 5, note: "Uống sau ăn", insurance: true },
        { name: "Vitamin C 1000mg", dose: "1 viên", frequency: "1 lần/ngày", duration: 10, note: "", insurance: false },
    ]);

    const updateMedication = (index, key, value) => {
        const updated = [...medications];
        updated[index][key] = value;
        setMedications(updated);
    };

    const removeMedication = (index) => {
        setMedications(medications.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w p-6 bg-white rounded-xl shadow-sm">

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold">Danh sách thuốc</h2>
                    <button className="text-blue-500 text-sm font-medium hover:underline">+ Thêm thuốc</button>
                </div>

                <table className="w-full text-sm">
                    <thead className="text-gray-500 border-b">
                        <tr>
                            <th className="text-left py-2">Tên thuốc</th>
                            <th className="text-left py-2">Liều dùng</th>
                            <th className="text-left py-2">Tần suất</th>
                            <th className="text-left py-2">Thời gian</th>
                            <th className="text-left py-2">Ghi chú</th>
                            <th className="text-center py-2">BHYT</th>
                            <th className="text-center py-2">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medications.map((med, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2"><input className="w-full" value={med.name} onChange={e => updateMedication(index, 'name', e.target.value)} /></td>
                                <td className="py-2"><input className="w-full" value={med.dose} onChange={e => updateMedication(index, 'dose', e.target.value)} /></td>
                                <td className="py-2"><input className="w-full" value={med.frequency} onChange={e => updateMedication(index, 'frequency', e.target.value)} /></td>
                                <td className="py-2 flex items-center">
                                    <input type="number" className="w-16 mr-1" value={med.duration} onChange={e => updateMedication(index, 'duration', e.target.value)} />
                                    <span>ngày</span>
                                </td>
                                <td className="py-2"><input className="w-full" placeholder="Ghi chú" value={med.note} onChange={e => updateMedication(index, 'note', e.target.value)} /></td>
                                <td className="text-center"><input type="checkbox" checked={med.insurance} onChange={e => updateMedication(index, 'insurance', e.target.checked)} /></td>
                                <td className="text-center">
                                    <button onClick={() => removeMedication(index)}><Trash2 size={16} className="text-red-500 hover:text-red-700" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="grid grid-cols-2 gap-4">
                    <textarea className="border rounded p-2 h-24" placeholder="Nhập các lưu ý đặc biệt về dị ứng thuốc, chống chỉ định…" />
                    <textarea className="border rounded p-2 h-24" placeholder="Nhập hướng dẫn sử dụng thuốc, chế độ ăn uống, sinh hoạt…" />
                </div>

                <div className="flex justify-between items-center w-full">
                    <div className="space-x-2">
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                            Tải mẫu đơn thuốc
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                            Gửi đơn thuốc đến nhà thuốc
                        </button>
                    </div>
                    <div className=" flex items-center space-x-2 ">
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Quay lại chẩn đoán
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                            <Printer className="w-4 h-4" />
                            In toa thuốc
                        </button>
                        <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">
                            Lưu toa thuốc
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
