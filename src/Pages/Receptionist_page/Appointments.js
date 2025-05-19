import { useState, useRef } from "react"
import Siderbar from "../../Components/Siderbar";
import Header from "../../Components/Header";
// import { Link } from 'react-router-dom';
import { Calendar, Search } from "lucide-react";
import { Filter, Printer, Download, Edit, Trash, ChevronDown } from "lucide-react"

const Appointments = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });
    const inputRef = useRef(null);
    const handleOpenPicker = () => {
        if (inputRef.current) {
            inputRef.current.showPicker?.();
            inputRef.current.click();
        }
    };
    const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    //     {
    //         time: '09:00 AM',
    //         patient: 'John Doe',
    //         id: 'PT-2023001',
    //         service: 'General Examination',
    //         doctor: 'Dr. Sarah Johnson',
    //         status: 'Confirmed',
    //     },
    //     {
    //         time: '10:30 AM',
    //         patient: 'Jane Smith',
    //         id: 'PT-2023002',
    //         service: 'Blood Test',
    //         doctor: 'Dr. Michael Brown',
    //         status: 'Confirmed',
    //     },
    //     {
    //         time: '11:15 AM',
    //         patient: 'Robert Williams',
    //         id: 'PT-2023003',
    //         service: 'Cardiology',
    //         doctor: 'Dr. Emily Davis',
    //         status: 'Pending',
    //     },
    //     {
    //         time: '01:30 PM',
    //         patient: 'Sarah Johnson',
    //         id: 'PT-2023004',
    //         service: 'X-ray',
    //         doctor: 'Dr. James Wilson',
    //         status: 'Confirmed',
    //     },
    //     {
    //         time: '02:45 PM',
    //         patient: 'Michael Thompson',
    //         id: 'PT-2023005',
    //         service: 'Dermatology',
    //         doctor: 'Dr. Lisa Martinez',
    //         status: 'Cancelled',
    //     },
    // ];
    // const getStatusStyle = (status) => {
    //     switch (status) {
    //         case 'Confirmed':
    //             return 'bg-green-100 text-green-600';
    //         case 'Pending':
    //             return 'bg-yellow-100 text-yellow-600';
    //         case 'Cancelled':
    //             return 'bg-red-100 text-red-600';
    //         default:
    //             return 'bg-gray-100 text-gray-600';
    //     }
    // };
    return (
        <div className="flex h-screen bg-gray-100">
            {sidebarOpen && <Siderbar />}
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    isSidebarOpen={sidebarOpen}
                />        <main className="p-6 overflow-auto h-full">
                    <div className=" h-full">
                        <div className="bg-white shadow rounded-lg p-4">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-gray-700 font-medium">
                                    <button
                                        type="button"
                                        onClick={handleOpenPicker}
                                        className="text-blue-600 cursor-pointer"
                                    >
                                        <Calendar />
                                    </button>
                                    {/* Hidden but clickable input */}
                                    <input
                                        ref={inputRef}
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="absolute w-0 h-0 opacity-0 pointer-events-none mt-[25px]"
                                    />
                                    <span className="hidden sm:inline text-blue-600 text-sm font-medium">
                                        {formattedDate}
                                    </span>


                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Search Input */}
                                    <div className="flex items-center max-w-[220px] w-full h-[40px] px-3 rounded-[12px] border border-gray-300 transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] shadow-[0px_0px_20px_-18px] hover:shadow-[0px_0px_20px_-17px] hover:border-gray-300 focus-within:border-gray-500 active:scale-[0.95] bg-white">
                                        <Search className="text-gray-400 w-5 h-5 mr-2" />
                                        <input
                                            type="text"
                                            name="text"
                                            placeholder="Tìm kiếm tên bệnh nhân"
                                            className="w-full h-full outline-none border-none text-sm bg-transparent placeholder-gray-400"
                                        />
                                    </div>

                                    {/* Button */}
                                    {/* <button className="h-[40px] w-[150px] px-3 flex items-center bg-blue-600 text-white rounded hover:bg-blue-700 text-xs ">
                                        + New Appointment
                                    </button> */}
                                </div>

                            </div>
                            {/* Table */}
                            <div className="p-6">
                                <div className="max-w-7xl mx-auto space-y-6">
                                    {/* Page Header */}
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-800">Lịch Hẹn</h1>
                                            <p className="text-gray-500 mt-1">Quản lý lịch hẹn khám bệnh</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Tìm kiếm lịch hẹn..."
                                                    className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                                                />
                                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            </div>
                                            {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                                                <Plus className="h-4 w-4" />
                                                <span>Tạo lịch hẹn</span>
                                            </button> */}
                                        </div>
                                    </div>

                                    {/* Calendar View */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-800">Lịch hẹn tháng 5/2023</h2>
                                                <p className="text-gray-500 text-sm">Xem và quản lý lịch hẹn theo ngày</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                    Hôm nay
                                                </button>
                                                <button className="p-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                                                    <ChevronDown className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid grid-cols-7 gap-2 mb-4">
                                                <div className="text-center text-sm font-medium text-gray-500">CN</div>
                                                <div className="text-center text-sm font-medium text-gray-500">T2</div>
                                                <div className="text-center text-sm font-medium text-gray-500">T3</div>
                                                <div className="text-center text-sm font-medium text-gray-500">T4</div>
                                                <div className="text-center text-sm font-medium text-gray-500">T5</div>
                                                <div className="text-center text-sm font-medium text-gray-500">T6</div>
                                                <div className="text-center text-sm font-medium text-gray-500">T7</div>
                                            </div>
                                            <div className="grid grid-cols-7 gap-2">
                                                {/* Calendar days */}
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg text-gray-400">30</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">1</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">2</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">3</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">4</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">5</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">6</div>

                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">7</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">8</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">9</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">10</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">11</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">12</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">13</div>

                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">14</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">15</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">16</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">17</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg bg-blue-50 ring-2 ring-blue-600">
                                                    <div className="text-sm font-medium">18</div>
                                                    <div className="mt-1 text-xs bg-blue-100 text-blue-800 p-1 rounded">3 lịch hẹn</div>
                                                </div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">19</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">20</div>

                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">21</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">22</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">23</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">24</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">25</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">26</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">27</div>

                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">28</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">29</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">30</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg">31</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg text-gray-400">1</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg text-gray-400">2</div>
                                                <div className="h-24 p-1 border border-gray-200 rounded-lg text-gray-400">3</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Appointments List */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-800">Lịch hẹn hôm nay</h2>
                                                <p className="text-gray-500 text-sm">Danh sách lịch hẹn ngày 18/05/2023</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="text-gray-500 hover:text-gray-700 p-1">
                                                    <Filter className="h-5 w-5" />
                                                </button>
                                                <button className="text-gray-500 hover:text-gray-700 p-1">
                                                    <Printer className="h-5 w-5" />
                                                </button>
                                                <button className="text-gray-500 hover:text-gray-700 p-1">
                                                    <Download className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            <th className="px-3 py-3">Thời gian</th>
                                                            <th className="px-3 py-3">Mã BN</th>
                                                            <th className="px-3 py-3">Họ tên</th>
                                                            <th className="px-3 py-3">Khoa khám</th>
                                                            <th className="px-3 py-3">Bác sĩ</th>
                                                            <th className="px-3 py-3">Trạng thái</th>
                                                            <th className="px-3 py-3">Thao tác</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        <tr>
                                                            <td className="px-3 py-4 text-sm font-medium text-gray-900">10:00</td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">BN0004</td>
                                                            <td className="px-3 py-4">
                                                                <div className="flex items-center">
                                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium text-xs">
                                                                        NT
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <p className="text-sm font-medium text-gray-900">Nguyễn Thị D</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">Nội khoa</td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">BS. Trần Văn X</td>
                                                            <td className="px-3 py-4">
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    Đã xác nhận
                                                                </span>
                                                            </td>
                                                            <td className="px-3 py-4 text-sm">
                                                                <div className="flex items-center space-x-2">
                                                                    <button className="text-blue-600 hover:text-blue-900">
                                                                        <Edit className="h-4 w-4" />
                                                                    </button>
                                                                    <button className="text-red-600 hover:text-red-900">
                                                                        <Trash className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-4 text-sm font-medium text-gray-900">10:15</td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">BN0005</td>
                                                            <td className="px-3 py-4">
                                                                <div className="flex items-center">
                                                                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-medium text-xs">
                                                                        TV
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <p className="text-sm font-medium text-gray-900">Trần Văn E</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">Tim mạch</td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">BS. Lê Thị Y</td>
                                                            <td className="px-3 py-4">
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                    Chờ xác nhận
                                                                </span>
                                                            </td>
                                                            <td className="px-3 py-4 text-sm">
                                                                <div className="flex items-center space-x-2">
                                                                    <button className="text-blue-600 hover:text-blue-900">
                                                                        <Edit className="h-4 w-4" />
                                                                    </button>
                                                                    <button className="text-red-600 hover:text-red-900">
                                                                        <Trash className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-4 text-sm font-medium text-gray-900">10:30</td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">BN0006</td>
                                                            <td className="px-3 py-4">
                                                                <div className="flex items-center">
                                                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium text-xs">
                                                                        PT
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <p className="text-sm font-medium text-gray-900">Phạm Thị F</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">Nội khoa</td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">BS. Phạm Văn Z</td>
                                                            <td className="px-3 py-4">
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    Đã xác nhận
                                                                </span>
                                                            </td>
                                                            <td className="px-3 py-4 text-sm">
                                                                <div className="flex items-center space-x-2">
                                                                    <button className="text-blue-600 hover:text-blue-900">
                                                                        <Edit className="h-4 w-4" />
                                                                    </button>
                                                                    <button className="text-red-600 hover:text-red-900">
                                                                        <Trash className="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    )
}
export default Appointments;