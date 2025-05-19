import {
  LayoutDashboard,
  User,
  Pill,
  HeartHandshake,
  TestTube2,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function SidebarAdmin() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if the current route is one of the user menu routes
  const isUserMenuActive =
    location.pathname === "/Admin/users/staff" ||
    location.pathname === "/Admin/users/account" ||
    location.pathname === "/Admin/users/Decentralize";

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200" style={{ paddingBottom: "20px" }}>
        <h2 className="text-xl font-bold text-blue-900">Hospital Management</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <SidebarItem
          icon={<LayoutDashboard className="h-5 w-5" />}
          label="Dashboard"
          to="/Admin/Dashboard"
          active={location.pathname === "/Admin/Dashboard"}
        />

        {/* Dropdown User Menu */}
        <div ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="flex items-center w-full px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <span className="mr-3 text-gray-500">
              <User className="h-5 w-5" />
            </span>
            <span className="flex-1 text-left">User</span>
            <ChevronRight
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? "rotate-90" : ""}`}
            />
          </button>

          {/* Always open if any user-related page is active */}
          {(userMenuOpen || isUserMenuActive) && (
            <div className="ml-7 mt-1 space-y-1">
              <Link
                to="/Admin/users/staff"
                className={`flex items-center gap-2 p-2 text-sm rounded-lg ${location.pathname === "/Admin/users/staff" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-blue-50"}`}
              >
                <span>Doctor / Lễ tân</span>
              </Link>
              <Link
                to="/Admin/users/account"
                className={`flex items-center gap-2 p-2 text-sm rounded-lg ${location.pathname === "/Admin/users/account" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-blue-50"}`}
              >
                <span>Account</span>
              </Link>
              <Link
                to="/Admin/users/Decentralize"
                className={`flex items-center gap-2 p-2 text-sm rounded-lg ${location.pathname === "/Admin/users/Decentralize" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-blue-50"}`}
              >
                <span>Decentralize</span>
              </Link>
            </div>
          )}
        </div>

        <SidebarItem
          icon={<Pill className="h-5 w-5" />}
          label="Medicine"
          to="/Admin/medicine"
          active={location.pathname === "/Admin/medicine"}
        />
        <SidebarItem
          icon={<HeartHandshake className="h-5 w-5" />}
          label="Service"
          to="/Admin/service"
          active={location.pathname === "/Admin/service"}
        />
        <SidebarItem
          icon={<TestTube2 className="h-5 w-5" />}
          label="Medical Test"
          to="/Admin/medicaltest"
          active={location.pathname === "/Admin/medicaltest"}
        />
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-red-100 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, to, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md text-sm ${active ? "bg-emerald-50 text-emerald-500" : "text-gray-600 hover:bg-gray-100"}`}
    >
      <span className={`mr-3 ${active ? "text-emerald-500" : "text-gray-500"}`}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}

export default SidebarAdmin;
