import React from "react";
import {
  CalendarDays,
  Stethoscope,
  ClipboardCheck,
  FileText,
  Edit,
  Building2,
} from "lucide-react";

const mockMedicalRecords = [
  {
    id: 1,
    date: "15/05/2023",
    department: "Nội tổng quát",
    diagnosis: "Viêm họng cấp",
    treatment: "Kháng sinh + Giảm đau",
    testTitle: "Xét nghiệm máu",
    testResult: "WBC: 7.2, RBC: 5.1, PLT: 250",
    testStatus: "Bình thường",
  },
  {
    id: 2,
    date: "01/04/2023",
    department: "Tim mạch",
    diagnosis: "Theo dõi huyết áp",
    treatment: "Điều chỉnh chế độ ăn, tập thể dục",
    testTitle: "Điện tâm đồ",
    testResult: "Nhịp tim đều, không có dấu hiệu bất thường",
    testStatus: "Bình thường",
  },
];

function MedicalRecord() {
  return (
    <div className="space-y-6">
      {mockMedicalRecords.map((record) => (
        <div
          key={record.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out overflow-hidden"
        >
          <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center text-blue-600">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{record.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Building2 className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{record.department}</span>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center mb-2 text-blue-700">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  <span className="font-medium">Chẩn đoán</span>
                </div>
                <p className="text-gray-700">{record.diagnosis}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center mb-2 text-green-700">
                  <Edit className="w-4 h-4 mr-2" />
                  <span className="font-medium">Điều trị</span>
                </div>
                <p className="text-gray-700">{record.treatment}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <div className="flex items-center mb-3">
                <FileText className="w-4 h-4 mr-2 text-gray-600" />
                <span className="font-medium text-gray-700">
                  Kết quả xét nghiệm
                </span>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">
                    {record.testTitle}
                  </h4>
                  <p className="text-gray-600">{record.testResult}</p>
                  <div className="flex items-center mt-2">
                    <ClipboardCheck className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-green-600 font-medium">
                      {record.testStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MedicalRecord;
