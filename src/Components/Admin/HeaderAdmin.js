import { Search, Bell, MessageSquare, Globe, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function HeaderAdmin() {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      {/* Search input */}
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search anything"
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right-side icons */}
      <div className="flex items-center space-x-4">
        {/* Globe icon */}
        <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
          <Globe className="h-5 w-5 text-gray-500" />
        </button>

        {/* Message icon with dot */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none">
          <MessageSquare className="h-5 w-5 text-gray-500" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* Notification bell with dot */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar + dropdown */}
        <div className="relative group">
          <div className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-100">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-medium text-sm mr-2">
              AD
            </div>
            {/* <span className="text-sm font-medium">{name}</span> */}
          </div>
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-50">
            <div className="py-1">
              <Link
                to={"/Admin/information"}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User className="w-4 h-4 mr-2" />
                Thông tin tài khoản
              </Link>
              <button
                onClick={Logout}
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
  );
}

export default HeaderAdmin;
