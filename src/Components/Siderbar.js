import { Users, Calendar, BarChart2, LogOut, Home, FileText, DollarSign } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Siderbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const role = JSON.parse(localStorage.getItem('user'))?.roles;



    const Reaload = () => {
        if (role.includes("DOCTOR")) {
            navigate("/HealthCheck_BS");
        } else if (role.includes("RECEPTIONIST")) {
            navigate("/Dashboard");
        }
    };

    const navItems = [
        { to: '/HealthCheck_BS', icon: <Users className="w-5 h-5 mr-3" />, label: 'Khám Bệnh' },
        { to: '/Appointments_BS', icon: <Calendar className="w-5 h-5 mr-3" />, label: 'Lịch hẹn' },
        { to: '/Reports_BS', icon: <BarChart2 className="w-5 h-5 mr-3" />, label: 'Báo cáo' },
        // { to: '/settings_BS', icon: <Settings className="w-5 h-5 mr-3" />, label: 'Cài đặt' },
    ];

    const navItems2 = [
        { to: '/Dashboard', icon: <Home className="w-5 h-5 mr-3" />, label: 'Bảng Điều Khiển' },
        { to: '/PatientReception_LT', icon: <Users className="w-5 h-5 mr-3" />, label: 'Tiếp Nhận Bệnh Nhân' },
        { to: '/MedicalRegistration_LT', icon: <FileText className="w-5 h-5 mr-3" />, label: 'Đăng Ký Khám' },
        { to: '/Appointments_LT', icon: <Calendar className="w-5 h-5 mr-3" />, label: 'Lịch Hẹn' },
        { to: '/PatientRecords_LT', icon: <FileText className="w-5 h-5 mr-3" />, label: 'Hồ Sơ Bệnh Nhân' },
        { to: '/HospitalFees_LT', icon: <DollarSign className="w-5 h-5 mr-3" />, label: 'Thanh Toán Chi Phí' },
        // { to: '/MedicalServices_LT', icon: <Activity className="w-5 h-5 mr-3" />, label: 'Dịch Vụ Y Tế' },
        // { to: '/Settings_LT', icon: <Settings className="w-5 h-5 mr-3" />, label: 'Cài Đặt' },
    ];

    const menuItems = role.includes("DOCTOR") ? navItems : navItems2;




    return (
        <div className="w-64 h-full bg-[#1D4ED8] text-white flex flex-col transition-all duration-300">
            {/* Sidebar Header */}
            <div onClick={Reaload} className="p-4 border-b border-blue-700 cursor-pointer">
                <h2 className="text-3xl font-bold">MediTrack</h2>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.to}>
                            <Link
                                to={item.to}
                                className={`flex items-center p-2 rounded-md transition-all duration-200 ${currentPath === item.to
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-blue-600 hover:text-white'
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-blue-700 mt-auto">
                <button onClick={() => navigate('/logout')} className="flex items-center w-full p-2 rounded-md hover:bg-blue-700 transition-colors">
                    <LogOut className="w-5 h-5 mr-3" />
                    <span>Đăng xuất</span>
                </button>
            </div>
        </div >
    );
};

export default Siderbar;
