import { useState } from "react"
import Siderbar from "../../Components/Siderbar";
import Header from "../../Components/Header";


const Paymanent = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const fees = [
        { service: 'General Examination', cost: 50 },
        { service: 'Doctor Consultation (Specialist)', cost: 75.5 },
        { service: 'Blood Test', cost: 35 },
        { service: 'Administrative Fee', cost: 10 },
    ];

    const total = fees.reduce((acc, item) => acc + item.cost, 0);

    return (
        <div className="flex h-screen bg-gray-100">
            {sidebarOpen && <Siderbar />}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    isSidebarOpen={sidebarOpen}
                />
                <main className="p-6 overflow-auto h-full">
                    <div className="bg-white shadow rounded-lg p-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium">Patient ID / Phone Number / Full Name</label>
                            <div className="flex gap-2 mt-1">
                                <input type="text" placeholder="PT-2023001" className="border rounded px-3 py-2 w-full" />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg p-6 mt-[20px]" >
                        <div className="bg-blue-50 border p-4 rounded mb-3 ">
                            <h2 className="text-blue-700 font-semibold">Patient Information</h2>
                            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                                <p><strong>Name:</strong> John Doe</p>
                                <p><strong>Patient Code:</strong> PT-2023001</p>
                                <p><strong>Date of Birth:</strong> 1985/05/15</p>
                                <p><strong>Phone:</strong> 0123456789</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Fee Details</h2>
                            <table className="w-full border text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border">Service</th>
                                        <th className="p-2 border">Department</th>
                                        <th className="p-2 border">Doctor</th>
                                        <th className="p-2 border">Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fees.map((item, index) => (
                                        <tr key={index}>
                                            <td className="p-2 border">{item.service}</td>
                                            <td className="p-2 border">General Medicine</td>
                                            <td className="p-2 border">Dr. Sarah Johnson</td>
                                            <td className="p-2 border">${item.cost.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3" className="text-right font-bold p-2 border">Total</td>
                                        <td className="p-2 border font-bold">${total.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </main>

            </div >
        </div >
    )
}
export default Paymanent;