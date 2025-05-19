import { useState } from "react"
import Siderbar from "../../Components/Siderbar";
import Header from "../../Components/Header";
import {
    Calendar,
    Clock,
    FileText,
    User,
    Users,
    Search, Plus, TrendingUp, TrendingDown, DollarSign
} from "lucide-react"

const Dashboard = () => {
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
                        <main className="flex-1 p-6 overflow-auto bg-gray-50">
                            <div className=" mx-auto space-y-6">
                                {/* Dashboard Header */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800">Bảng Điều Khiển</h1>
                                        <p className="text-gray-500 mt-1">Tổng quan hoạt động khám chữa bệnh</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Tìm kiếm..."
                                                className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                                            />
                                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        </div>
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                                            <Plus className="h-4 w-4" />
                                            <span>Thêm mới</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-gray-500 text-sm font-medium">Bệnh nhân hôm nay</p>
                                                <h3 className="text-3xl font-bold mt-2 text-gray-800">42</h3>
                                                <p className="text-green-600 text-sm font-medium mt-1 flex items-center">
                                                    <TrendingUp className="h-3 w-3 mr-1" />
                                                    12% so với hôm qua
                                                </p>
                                            </div>
                                            <div className="bg-blue-100 p-3 rounded-lg">
                                                <Users className="h-6 w-6 text-blue-600" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-gray-500 text-sm font-medium">Lịch hẹn</p>
                                                <h3 className="text-3xl font-bold mt-2 text-gray-800">18</h3>
                                                <p className="text-gray-500 text-sm font-medium mt-1">Hôm nay</p>
                                            </div>
                                            <div className="bg-purple-100 p-3 rounded-lg">
                                                <Calendar className="h-6 w-6 text-purple-600" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-gray-500 text-sm font-medium">Đang chờ khám</p>
                                                <h3 className="text-3xl font-bold mt-2 text-gray-800">7</h3>
                                                <p className="text-gray-500 text-sm font-medium mt-1">Thời gian chờ: ~25 phút</p>
                                            </div>
                                            <div className="bg-yellow-100 p-3 rounded-lg">
                                                <Clock className="h-6 w-6 text-yellow-600" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-gray-500 text-sm font-medium">Doanh thu</p>
                                                <h3 className="text-3xl font-bold mt-2 text-gray-800">4.5M</h3>
                                                <p className="text-red-600 text-sm font-medium mt-1 flex items-center">
                                                    <TrendingDown className="h-3 w-3 mr-1" />
                                                    3% so với hôm qua
                                                </p>
                                            </div>
                                            <div className="bg-green-100 p-3 rounded-lg">
                                                <DollarSign className="h-6 w-6 text-green-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content Sections */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Patient Queue */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-800">Hàng đợi bệnh nhân</h2>
                                                <p className="text-gray-500 text-sm">Danh sách bệnh nhân đang chờ khám</p>
                                            </div>
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Xem tất cả</button>
                                        </div>
                                        <div className="p-6">
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            <th className="px-3 py-3">STT</th>
                                                            <th className="px-3 py-3">Họ tên</th>
                                                            <th className="px-3 py-3">Thời gian</th>
                                                            <th className="px-3 py-3">Phòng khám</th>
                                                            <th className="px-3 py-3">Trạng thái</th>
                                                            <th className="px-3 py-3">Thao tác</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        <tr>
                                                            <td className="px-3 py-4 text-sm font-medium text-gray-900">01</td>
                                                            <td className="px-3 py-4">
                                                                <div className="flex items-center">
                                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium text-xs">
                                                                        NV
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <p className="text-sm font-medium text-gray-900">Nguyễn Văn A</p>
                                                                        <p className="text-xs text-gray-500">Nam, 45 tuổi</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">08:30</td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">Nội khoa</td>
                                                            <td className="px-3 py-4">
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    Đang khám
                                                                </span>
                                                            </td>
                                                            <td className="px-3 py-4 text-sm">
                                                                <button className="text-blue-600 hover:text-blue-900 mr-3">Chi tiết</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-4 text-sm font-medium text-gray-900">02</td>
                                                            <td className="px-3 py-4">
                                                                <div className="flex items-center">
                                                                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-medium text-xs">
                                                                        TT
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <p className="text-sm font-medium text-gray-900">Trần Thị B</p>
                                                                        <p className="text-xs text-gray-500">Nữ, 32 tuổi</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">08:45</td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">Ngoại khoa</td>
                                                            <td className="px-3 py-4">
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                    Chờ khám
                                                                </span>
                                                            </td>
                                                            <td className="px-3 py-4 text-sm">
                                                                <button className="text-blue-600 hover:text-blue-900 mr-3">Chi tiết</button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="px-3 py-4 text-sm font-medium text-gray-900">03</td>
                                                            <td className="px-3 py-4">
                                                                <div className="flex items-center">
                                                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium text-xs">
                                                                        LV
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <p className="text-sm font-medium text-gray-900">Lê Văn C</p>
                                                                        <p className="text-xs text-gray-500">Nam, 28 tuổi</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">09:00</td>
                                                            <td className="px-3 py-4 text-sm text-gray-500">Tai-Mũi-Họng</td>
                                                            <td className="px-3 py-4">
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                    Chờ khám
                                                                </span>
                                                            </td>
                                                            <td className="px-3 py-4 text-sm">
                                                                <button className="text-blue-600 hover:text-blue-900 mr-3">Chi tiết</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Upcoming Appointments */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-800">Lịch hẹn sắp tới</h2>
                                                <p className="text-gray-500 text-sm">Các cuộc hẹn trong 2 giờ tới</p>
                                            </div>
                                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Xem tất cả</button>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <Clock className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm font-medium text-gray-900">Nguyễn Thị D</p>
                                                            <p className="text-xs text-gray-500">10:00</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">Khám tổng quát</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <Clock className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm font-medium text-gray-900">Trần Văn E</p>
                                                            <p className="text-xs text-gray-500">10:15</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">Khám chuyên khoa Tim mạch</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <Clock className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm font-medium text-gray-900">Phạm Thị F</p>
                                                            <p className="text-xs text-gray-500">10:30</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">Tái khám</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <Clock className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm font-medium text-gray-900">Hoàng Văn G</p>
                                                            <p className="text-xs text-gray-500">10:45</p>
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1">Khám chuyên khoa Nhi</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activities */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-800">Hoạt động gần đây</h2>
                                            <p className="text-gray-500 text-sm">Các hoạt động trong hệ thống</p>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Xem tất cả</button>
                                    </div>
                                    <div className="p-6">
                                        <div className="space-y-6">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <User className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm text-gray-900">
                                                        <span className="font-medium">Nguyễn Văn A</span> đã hoàn thành khám bệnh
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">15 phút trước</p>
                                                </div>
                                            </div>

                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                        <FileText className="h-4 w-4 text-green-600" />
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm text-gray-900">
                                                        <span className="font-medium">BS. Trần Văn X</span> đã cập nhật hồ sơ bệnh nhân
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">30 phút trước</p>
                                                </div>
                                            </div>

                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                        <Calendar className="h-4 w-4 text-purple-600" />
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm text-gray-900">
                                                        <span className="font-medium">Lê Thị H</span> đã đặt lịch hẹn mới
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">1 giờ trước</p>
                                                </div>
                                            </div>

                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                                        <DollarSign className="h-4 w-4 text-yellow-600" />
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm text-gray-900">
                                                        <span className="font-medium">Phạm Văn K</span> đã thanh toán viện phí
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">2 giờ trước</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </main>

            </div>
        </div>
    )
}
export default Dashboard;