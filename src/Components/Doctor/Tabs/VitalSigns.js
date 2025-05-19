import React from 'react';

export default function VitalSigns() {
    const vitals = {
        huyetAp: '120/80',
        nhipTim: 75,
        nhietDo: 37.5,
        nhipTho: 16,
        spo2: 98,
        duongHuyet: 95,
        bmi: 22.5,
        chieuCao: 170,
        canNang: 65,
        ghiChu: 'Vital signs are within normal range',
    };

    const history = [
        {
            date: '2024-01-14',
            nhietDo: 37.5,
            huyetAp: '120/80',
            nhipTim: 75,
            nhipTho: 16,
            spo2: 98,
            duongHuyet: 95,
        },
        {
            date: '2024-01-07',
            nhietDo: 37.2,
            huyetAp: '118/78',
            nhipTim: 78,
            nhipTho: 16,
            spo2: 98,
            duongHuyet: 98,
        },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            {/* Chỉ số hiện tại */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Huyết áp</p>
                    <p className="text-2xl font-semibold">{vitals.huyetAp}</p>
                    <span className="text-xs text-gray-400">mmHg</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Nhịp tim</p>
                    <p className="text-2xl font-semibold">{vitals.nhipTim}</p>
                    <span className="text-xs text-gray-400">bpm</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Nhiệt độ</p>
                    <p className="text-2xl font-semibold text-red-600">{vitals.nhietDo}</p>
                    <span className="text-xs text-gray-400">℃</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">SpO2</p>
                    <p className="text-2xl font-semibold">{vitals.spo2}%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Nhịp thở</p>
                    <p className="text-2xl font-semibold">{vitals.nhipTho}</p>
                    <span className="text-xs text-gray-400">/phút</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Đường huyết</p>
                    <p className="text-2xl font-semibold">{vitals.duongHuyet}</p>
                    <span className="text-xs text-gray-400">mg/dL</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">BMI</p>
                    <p className="text-2xl font-semibold">{vitals.bmi}</p>
                </div>
            </div>

            {/* Chiều cao, cân nặng */}
            <div className="flex gap-6">
                <div>
                    <label className="text-sm text-gray-600">Chiều cao</label>
                    <div className="mt-1 text-gray-900">{vitals.chieuCao} cm</div>
                </div>
                <div>
                    <label className="text-sm text-gray-600">Cân nặng</label>
                    <div className="mt-1 text-gray-900">{vitals.canNang} kg</div>
                </div>
            </div>

            {/* Ghi chú */}
            <div>
                <label className="text-sm text-gray-600">Ghi chú đặc biệt</label>
                <p className="mt-1 text-gray-800">{vitals.ghiChu}</p>
            </div>

            {/* Lịch sử chỉ số */}
            <div>
                <h3 className="font-semibold text-md mb-2">Lịch sử chỉ số</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border text-left text-gray-700">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-2 border">Ngày</th>
                                <th className="px-3 py-2 border">Nhiệt độ (℃)</th>
                                <th className="px-3 py-2 border">Huyết áp (mmHg)</th>
                                <th className="px-3 py-2 border">Nhịp tim (bpm)</th>
                                <th className="px-3 py-2 border">Nhịp thở</th>
                                <th className="px-3 py-2 border">SpO2 (%)</th>
                                <th className="px-3 py-2 border">Đường huyết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item, idx) => (
                                <tr key={idx} className="border-t">
                                    <td className="px-3 py-2">{item.date}</td>
                                    <td className={`px-3 py-2 ${item.nhietDo >= 37.5 ? 'text-red-500 font-semibold' : ''}`}>
                                        {item.nhietDo}
                                    </td>
                                    <td className="px-3 py-2">{item.huyetAp}</td>
                                    <td className="px-3 py-2">{item.nhipTim}</td>
                                    <td className="px-3 py-2">{item.nhipTho}</td>
                                    <td className="px-3 py-2">{item.spo2}</td>
                                    <td className={`px-3 py-2 ${item.duongHuyet >= 100 ? 'text-red-500' : 'text-green-600'}`}>
                                        {item.duongHuyet}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
