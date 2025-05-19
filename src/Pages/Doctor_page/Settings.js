import { useState } from "react"
import Siderbar from "../../Components/Siderbar";
import Header from "../../Components/Header";


const Settings = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100">
            {sidebarOpen && <Siderbar />}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    isSidebarOpen={sidebarOpen}
                />        <main className="p-6 overflow-auto h-full">
                    <div className="flex space-x-6 h-full">
                    </div>
                </main>

            </div>
        </div>
    )
}
export default Settings;