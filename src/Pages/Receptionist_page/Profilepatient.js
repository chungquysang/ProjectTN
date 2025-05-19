import { useState } from "react"
import Siderbar from "../../Components/Siderbar";
import Header from "../../Components/Header";


const ProfilePatient = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);


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
                </main>

            </div >
        </div >
    )
}
export default ProfilePatient;