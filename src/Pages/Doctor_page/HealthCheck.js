import React from 'react';
import { useState } from "react"
import Siderbar from '../../Components/Siderbar';
import Header from '../../Components/Header';
import PatientSidebar from "../../Components/Doctor/PatientSidebar"
import { ArrowLeft } from "lucide-react"
// gọi các Tabs của bác sĩ
import {
    PatientInfoTab,
    MedicalHistoryTab,
    DiagnosisTab,
    PrescriptionsTab,
    TestResultsTab,
    AppointmentsTab,
    VitalSigns,
    HealthInsuranceInfo
} from "../../Components/Doctor/Tabs/ListTabs"

const HealthCheck = () => {
    const [activeTab, setActiveTab] = useState("patient-info") // đặt mặc định cho Tabs
    const [selectedPatientId, setSelectedPatientId] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [tabHistory, setTabHistory] = useState(["patient-info"]);
    const [selectedPatient, setSelectedPatient] = useState(null);


    const patientsData = [
        {
            id: 1,
            name: "Trần Thị Hồng",
            code: "BN23-001",
            status: "waiting",
            birthdate: "1990-05-12",
            phone: "0912345678",
            gender: "Nữ",
            address: "123 Lê Lợi, Q1, TP.HCM",
            email: "hongtran@gmail.com",
            insuranceNumber: "BHYT123456789"
        },
        {
            id: 2,
            name: "Nguyễn Văn Minh",
            code: "BN23-002",
            status: "examining",
            birthdate: "1985-09-20",
            phone: "0901123456",
            gender: "Nam",
            address: "45 Trần Hưng Đạo, Q5, TP.HCM",
            email: "minhnguyen85@gmail.com",
            insuranceNumber: "BHYT987654321"
        },
        {
            id: 3,
            name: "Lê Thị Lan",
            code: "BN23-003",
            status: "done",
            birthdate: "1995-03-08",
            phone: "0967123456",
            gender: "Nữ",
            address: "78 Nguyễn Thị Minh Khai, Q3, TP.HCM",
            email: "lelan95@gmail.com",
            insuranceNumber: "BHYT555666777"
        },
        {
            id: 4,
            name: "Phạm Quang Huy",
            code: "BN23-004",
            status: "waiting",
            birthdate: "1978-11-30",
            phone: "0934556677",
            gender: "Nam",
            address: "12 Hoàng Văn Thụ, Q.Tân Bình, TP.HCM",
            email: "huypham78@gmail.com",
            insuranceNumber: "BHYT222333444"
        },
        {
            id: 5,
            name: "Đỗ Thị Mai",
            code: "BN23-005",
            status: "examining",
            birthdate: "2000-06-25",
            phone: "0988991122",
            gender: "Nữ",
            address: "456 Tô Hiến Thành, Q.10, TP.HCM",
            email: "maidothi00@gmail.com",
            insuranceNumber: "BHYT111222333"
        }
    ];


    // hàm render tabs và chèn activetab
    const renderTabContent = () => {
        switch (activeTab) {
            case "patient-info":
                return <PatientInfoTab patient={selectedPatient} />
            case "medical-history":
                return <MedicalHistoryTab />
            case "vital-signs":
                return <VitalSigns />
            case "health-insurance":
                return <HealthInsuranceInfo />
            case "diagnosis":
                return <DiagnosisTab />
            case "prescriptions":
                return <PrescriptionsTab />
            case "test-results":
                return <TestResultsTab />
            case "appointments":
                return <AppointmentsTab />
            default:
                return <PatientInfoTab patient={selectedPatient} />
        }
    }

    const handleBack = () => {
        if (tabHistory.length > 1) {
            const newHistory = [...tabHistory];
            newHistory.pop(); // Bỏ tab hiện tại
            const previousTab = newHistory[newHistory.length - 1];
            setTabHistory(newHistory);
            setActiveTab(previousTab);
        } else {
            setActiveTab("patient-info");
        }
    };
    const getTabTitle = (tab) => {
        const tabTitles = {
            "patient-info": "Thông tin bệnh nhân :",
            "vital-signs": "Chỉ số sinh tồn :",
            "health-insurance": "Bảo hiểm y tế :",
            "medical-history": "Tiền sử bệnh :",
            "diagnosis": "Chẩn đoán :",
            "prescriptions": "Toa thuốc :",
            "test-results": "Kết quả xét nghiệm :",
            "appointments": "Đặt Lịch hẹn :",
        };
        return tabTitles[tab] || "Bệnh nhân tiếp nhận"; // Default title if no match
    };



    return (
        <div className="flex h-screen bg-gray-100">
            {sidebarOpen && <Siderbar />}

            <div className="flex flex-col flex-1 overflow-hidden">
                <Header
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    isSidebarOpen={sidebarOpen}
                />        <main className="p-6 overflow-auto h-full">
                    <div className="flex space-x-6 h-full">
                        {/* PatientSidebar cố định chiều cao và cuộn nếu quá dài */}
                        <div className="w-[300px] h-full overflow-y-auto flex-shrink-0 bg-white rounded shadow">
                            <PatientSidebar
                                patientsData={patientsData}
                                selectedPatientId={selectedPatientId}
                                setSelectedPatientId={setSelectedPatientId}
                                setSelectedPatient={setSelectedPatient} />
                        </div>

                        {/* Tab nội dung chiếm phần còn lại */}
                        <div className="flex-1 flex flex-col bg-gray-100 rounded-md shadow h-full p-1">
                            <div className="flex justify-between items-center mb-4 p-4">
                                <h1 className="text-xl font-semibold">{getTabTitle(activeTab)}</h1>
                                <button onClick={handleBack} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded" >
                                    <ArrowLeft size={16} className="mr-2" />
                                    Quay lại
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className=" flex rounded-lg border-b border-gray-200 bg-white text-sm px-4">
                                {[
                                    ["patient-info", "Thông tin bệnh nhân"],
                                    ["vital-signs", "Chỉ số sinh tồn"],
                                    ["health-insurance", "Bảo hiểm y tế"],
                                    ["medical-history", "Tiền sử bệnh"],
                                    ["diagnosis", "Chẩn đoán"],
                                    ["prescriptions", "Toa thuốc"],
                                    ["test-results", "Kết quả xét nghiệm"],
                                    ["appointments", " Đặt Lịch hẹn"],
                                ].map(([tab, label]) => (
                                    <button
                                        key={tab}
                                        onClick={() => {
                                            setTabHistory(prev => {
                                                if (prev[prev.length - 1] !== tab) {
                                                    return [...prev, tab];
                                                }
                                                return prev;
                                            });
                                            setActiveTab(tab);
                                        }}
                                        className={`px-4 py-3 ${activeTab === tab
                                            ? "text-blue-500 border-b-2 border-blue-500 font-medium"
                                            : "text-gray-600 hover:text-gray-900"
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            {/* Nội dung tab cuộn */}
                            <div className="flex-1 overflow-y-auto ">
                                {renderTabContent()}
                            </div>


                        </div>
                    </div>
                </main>

            </div>
        </div>
    )
}

export default HealthCheck
