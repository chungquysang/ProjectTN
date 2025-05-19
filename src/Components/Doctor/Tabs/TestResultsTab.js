import React from "react";

const bloodTestData = {
    "Huyết học": [
        { name: "Hồng cầu (RBC)", result: 4.8, unit: "T/L", range: "4.0–5.5" },
        { name: "Bạch cầu (WBC)", result: 9.5, unit: "G/L", range: "4.0–10.0" },
        { name: "Tiểu cầu (PLT)", result: 350, unit: "G/L", range: "150–400" },
        { name: "Huyết sắc tố (HGB)", result: 140, unit: "g/L", range: "120–160" },
    ],
    "Sinh hóa": [
        { name: "Glucose", result: 6.2, unit: "mmol/L", range: "3.9–6.1" },
        { name: "Ure", result: 5.5, unit: "mmol/L", range: "2.5–7.5" },
        { name: "Creatinin", result: 80, unit: "μmol/L", range: "53–106" },
        { name: "AST", result: 45, unit: "U/L", range: "0–40" },
        { name: "ALT", result: 50, unit: "U/L", range: "0–40" },
        { name: "Ure", result: 5.5, unit: "mmol/L", range: "2.5–7.5" },
        { name: "Creatinin", result: 80, unit: "μmol/L", range: "53–106" },
        { name: "AST", result: 45, unit: "U/L", range: "0–40" },
        { name: "ALT", result: 50, unit: "U/L", range: "0–40" },
    ],
};

const isResultNormal = (result, range) => {
    const [min, max] = range.replace(/[^\d.–]/g, "").split(/[–-]/).map(Number);
    return result >= min && result <= max;
};

const TestResultsTab = () => {
    return (
        <div className="max-w p-6 bg-white rounded-xl shadow-sm">

            <div className="space-y-8 p-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Danh sách xét nghiệm</h2>
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                        + Thêm xét nghiệm
                    </button>
                </div>

                {Object.entries(bloodTestData).map(([section, tests]) => (
                    <div key={section}>
                        <h3 className="text-md font-semibold mb-2">{section}</h3>
                        <table className="w-full table-auto border-collapse text-sm bg-white rounded-md shadow">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="p-2">Thông số</th>
                                    <th className="p-2">Kết quả</th>
                                    <th className="p-2">Đơn vị</th>
                                    <th className="p-2">Giá trị tham chiếu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tests.map((item, index) => {
                                    const isNormal = isResultNormal(item.result, item.range);
                                    return (
                                        <tr key={index} className="border-t">
                                            <td className="p-2">{item.name}</td>
                                            <td className={`p-2 font-medium ${isNormal ? "text-green-600" : "text-red-600"}`}>
                                                {item.result}
                                            </td>
                                            <td className="p-2">{item.unit}</td>
                                            <td className="p-2">{item.range}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestResultsTab;
