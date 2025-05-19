import {
  SidebarAdmin,
  HeaderAdmin,
} from "../../Components/Admin/controllerRouter";

function StaffAdmin() {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="flex-1 overflow-y-auto p-6"></main>
      </div>

      {/* Sidebar Floating Icons */}
    </div>
  );
}

export default StaffAdmin;
