import { useState } from "react"
import Siderbar from "../../Components/Siderbar";
import Header from "../../Components/Header";
import { Link } from "react-router-dom";

const PatientReception = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const patients = [
        {
            code: "PT-2023001",
            name: "Patient Name 1",
            dob: "1970/01/01",
            phone: "0123456001",
            lastVisit: "2023/01/05",
        },
        {
            code: "PT-2023002",
            name: "Patient Name 2",
            dob: "1971/02/02",
            phone: "0123456002",
            lastVisit: "2023/02/06",
        },
        {
            code: "PT-2023003",
            name: "Patient Name 3",
            dob: "1972/03/03",
            phone: "0123456003",
            lastVisit: "2023/03/07",
        },
        {
            code: "PT-2023004",
            name: "Patient Name 4",
            dob: "1973/04/04",
            phone: "0123456004",
            lastVisit: "2023/04/08",
        },
        {
            code: "PT-2023005",
            name: "Patient Name 5",
            dob: "1974/05/05",
            phone: "0123456005",
            lastVisit: "2023/05/09",
        },
        {
            code: "PT-2023006",
            name: "Patient Name 6",
            dob: "1975/06/06",
            phone: "0123456006",
            lastVisit: "2023/06/10",
        },
        {
            code: "PT-2023007",
            name: "Patient Name 7",
            dob: "1976/07/07",
            phone: "0123456007",
            lastVisit: "2023/07/11",
        },
        {
            code: "PT-2023008",
            name: "Patient Name 8",
            dob: "1977/08/08",
            phone: "0123456008",
            lastVisit: "2023/08/12",
        },
        {
            code: "PT-2023009",
            name: "Patient Name 9",
            dob: "1978/09/09",
            phone: "0123456009",
            lastVisit: "2023/09/13",
        },
        {
            code: "PT-2023010",
            name: "Patient Name 10",
            dob: "1979/10/10",
            phone: "0123456010",
            lastVisit: "2023/10/14",
        },
        {
            code: "PT-2023011",
            name: "Patient Name 11",
            dob: "1980/11/11",
            phone: "0123456011",
            lastVisit: "2023/11/15",
        },
        {
            code: "PT-2023012",
            name: "Patient Name 12",
            dob: "1981/12/12",
            phone: "0123456012",
            lastVisit: "2023/12/16",
        },
        {
            code: "PT-2023013",
            name: "Patient Name 13",
            dob: "1982/01/13",
            phone: "0123456013",
            lastVisit: "2024/01/17",
        },
        {
            code: "PT-2023014",
            name: "Patient Name 14",
            dob: "1983/02/14",
            phone: "0123456014",
            lastVisit: "2024/02/18",
        },
        {
            code: "PT-2023015",
            name: "Patient Name 15",
            dob: "1984/03/15",
            phone: "0123456015",
            lastVisit: "2024/03/19",
        },
        {
            code: "PT-2023016",
            name: "Patient Name 16",
            dob: "1985/04/16",
            phone: "0123456016",
            lastVisit: "2024/04/20",
        },
        {
            code: "PT-2023017",
            name: "Patient Name 17",
            dob: "1986/05/17",
            phone: "0123456017",
            lastVisit: "2024/05/21",
        },
        {
            code: "PT-2023018",
            name: "Patient Name 18",
            dob: "1987/06/18",
            phone: "0123456018",
            lastVisit: "2024/06/22",
        },
        {
            code: "PT-2023019",
            name: "Patient Name 19",
            dob: "1988/07/19",
            phone: "0123456019",
            lastVisit: "2024/07/23",
        },
        {
            code: "PT-2023020",
            name: "Patient Name 20",
            dob: "1989/08/20",
            phone: "0123456020",
            lastVisit: "2024/08/24",
        },
        {
            code: "PT-2023021",
            name: "Patient Name 21",
            dob: "1990/09/21",
            phone: "0123456021",
            lastVisit: "2024/09/25",
        },
        {
            code: "PT-2023022",
            name: "Patient Name 22",
            dob: "1991/10/22",
            phone: "0123456022",
            lastVisit: "2024/10/26",
        },
        {
            code: "PT-2023023",
            name: "Patient Name 23",
            dob: "1992/11/23",
            phone: "0123456023",
            lastVisit: "2024/11/27",
        },
        {
            code: "PT-2023024",
            name: "Patient Name 24",
            dob: "1993/12/24",
            phone: "0123456024",
            lastVisit: "2024/12/28",
        },
        {
            code: "PT-2023025",
            name: "Patient Name 25",
            dob: "1994/01/25",
            phone: "0123456025",
            lastVisit: "2025/01/01",
        },
        {
            code: "PT-2023026",
            name: "Patient Name 26",
            dob: "1995/02/26",
            phone: "0123456026",
            lastVisit: "2025/02/02",
        },
        {
            code: "PT-2023027",
            name: "Patient Name 27",
            dob: "1996/03/27",
            phone: "0123456027",
            lastVisit: "2025/03/03",
        },
        {
            code: "PT-2023028",
            name: "Patient Name 28",
            dob: "1997/04/28",
            phone: "0123456028",
            lastVisit: "2025/04/04",
        },
        {
            code: "PT-2023029",
            name: "Patient Name 29",
            dob: "1998/05/29",
            phone: "0123456029",
            lastVisit: "2025/05/05",
        },
        {
            code: "PT-2023030",
            name: "Patient Name 30",
            dob: "1999/06/30",
            phone: "0123456030",
            lastVisit: "2025/06/06",
        },
        {
            code: "PT-2023031",
            name: "Patient Name 31",
            dob: "2000/07/01",
            phone: "0123456031",
            lastVisit: "2025/07/07",
        },
        {
            code: "PT-2023032",
            name: "Patient Name 32",
            dob: "2001/08/02",
            phone: "0123456032",
            lastVisit: "2025/08/08",
        },
        {
            code: "PT-2023033",
            name: "Patient Name 33",
            dob: "2002/09/03",
            phone: "0123456033",
            lastVisit: "2025/09/09",
        },
        {
            code: "PT-2023034",
            name: "Patient Name 34",
            dob: "2003/10/04",
            phone: "0123456034",
            lastVisit: "2025/10/10",
        },
        {
            code: "PT-2023035",
            name: "Patient Name 35",
            dob: "2004/11/05",
            phone: "0123456035",
            lastVisit: "2025/11/11",
        },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {sidebarOpen && <Siderbar />}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    isSidebarOpen={sidebarOpen}
                />
                <main className="p-6  h-full">
                    <div className="h-full">
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded">
                                PATIENT RECEPTION
                            </div>

                            {/* Search */}
                            <div className="bg-white p-6 shadow rounded">
                                <h2 className="font-semibold mb-2">Search Patient</h2>
                                <p className="text-sm text-gray-500 mb-2">
                                    Patient ID / Phone Number / Full Name
                                </p>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Enter search term"
                                        className="flex-grow p-2 border border-gray-300 rounded"
                                    />
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                        Search
                                    </button>
                                </div>
                            </div>

                            {/* Recent Patients Table */}
                            <div className="bg-white p-6 shadow rounded ">
                                <h2 className="font-semibold mb-4">Recent Patients</h2>
                                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                                    <table className="min-w-full border border-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                {["Patient Code", "Full Name", "Date of Birth", "Phone Number", "Last Visit", "Actions"].map((header, idx) => (
                                                    <th key={idx} className="text-left px-4 py-2 border-b border-gray-200 text-sm font-medium text-gray-700">
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patients.map((patient, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2 border-b">{patient.code}</td>
                                                    <td className="px-4 py-2 border-b">{patient.name}</td>
                                                    <td className="px-4 py-2 border-b">{patient.dob}</td>
                                                    <td className="px-4 py-2 border-b">{patient.phone}</td>
                                                    <td className="px-4 py-2 border-b">{patient.lastVisit}</td>
                                                    <td className="px-4 py-2 border-b">
                                                        <div className="flex gap-2 text-sm">
                                                            <Link href="#" className="text-blue-600 hover:underline">View</Link>
                                                            <Link href="#" className="text-green-600 hover:underline">New Visit</Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    )
}
export default PatientReception;