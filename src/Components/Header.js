import { Bell, HelpCircle, Menu, User, LogOut, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import { GetinformationBS } from "../services/API/Doctor";
import { GetinformationLT } from "../services/API/Protocal"
import { useState, useEffect, useRef } from "react"

const Header = ({ onToggleSidebar, isSidebarOpen }) => {

    const navigate = useNavigate();
    const [nameBS, setnameBS] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const userid = user.id
    const role = user?.roles;
    const title = role?.includes('DOCTOR') ? "Thông tin bác sĩ" : "Thông tin Lễ Tân";
    const symbol = role?.includes('DOCTOR') ? "BS" : "LT";

    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;

            if (role?.includes('DOCTOR')) {
                const data = await GetinformationBS(userid);
                localStorage.setItem("Doctor", JSON.stringify(data));
                setnameBS(data?.fullName);
            } else if (role?.includes('PROTOCOL')) {
                const data = await GetinformationLT(userid);
                localStorage.setItem("Protocol", JSON.stringify(data));
                setnameBS(data?.fullName);
            } else {
                console.warn("Không xác định được vai trò người dùng.");
            }
        };

        if (userid && role) {
            fetchData();
        }
    }, [userid, role]);


    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between">
            <div className="flex items-center">
                <button
                    onClick={onToggleSidebar}
                    className="p-1 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    {isSidebarOpen ? (
                        <ArrowLeft className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
                <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold text-blue-600">MediTrack</h2>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-500 text-sm">Quản lý Khám bệnh</span>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none relative">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
                    <HelpCircle className="w-6 h-6" />
                </button>

                {/* Doctor profile with dropdown */}
                <div className="relative group">
                    <div className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-100">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-medium text-sm mr-2">
                            {symbol}
                        </div>
                        <span className="text-sm font-medium">{nameBS}</span>
                    </div>

                    {/* Dropdown menu */}
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-50">
                        <div className="py-1">
                            <Link
                                to={"/profile"}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <User className="w-4 h-4 mr-2" />
                                {title}
                            </Link>
                            <button onClick={() => navigate('/logout')}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
