// import { Link } from "react-router-dom";
// import MedicalRecord from "./MedicalRecord";
// import UserProfile from "./UserProfile";
// import Notifications from "./Notification";

// function SidebarAppointment() {
//   const medicalRecords = [
//     { id: 1, date: "2025-05-10", doctor: "Dr. John Doe", result: "Healthy" },
//     {
//       id: 2,
//       date: "2025-05-11",
//       doctor: "Dr. Jane Smith",
//       result: "Follow-up needed",
//     },
//   ];

//   const userProfile = {
//     name: "Nguyễn Văn A",
//     birthday: "1990-01-01",
//     gender: "Nam",
//     code: "BN12345",
//     email: "nguyenvana@example.com",
//   };

//   const notifications = [
//     {
//       id: 1,
//       title: "Thông báo 1",
//       message: "Lịch khám mới đã được cập nhật.",
//       date: "2025-05-12",
//     },
//     {
//       id: 2,
//       title: "Thông báo 2",
//       message: "Hãy kiểm tra kết quả khám.",
//       date: "2025-05-11",
//     },
//   ];

//   return (
//     <aside className="bg-gray-800 text-white w-64 min-h-screen p-5">
//       <h2 className="text-2xl font-bold mb-10">Bác sĩ</h2>
//       {/* <nav className="space-y-4">
//         <Link to="/dashboardbacsi" className="block hover:text-blue-300">
//           Dashboard
//         </Link>
//         <Link to="/lichkham" className="block hover:text-blue-300">
//           Lịch khám
//         </Link>
//         <Link to="/thongtincanhan" className="block hover:text-blue-300">
//           Thông tin cá nhân
//         </Link>
//         <Link to="/doimatkhau" className="block hover:text-blue-300">
//           Đổi mật khẩu
//         </Link>
//       </nav> */}
//       {/* <div className="mt-10">
//         <h3 className="text-xl font-bold mb-4">Hồ sơ y tế</h3>
//         <MedicalRecord medicalRecords={medicalRecords} />
//       </div> */}
//       <div className="mt-10">
//         <h3 className="text-xl font-bold mb-4">Thông tin cá nhân</h3>
//         <UserProfile {...userProfile} />
//       </div>
//       <div className="mt-10">
//         <h3 className="text-xl font-bold mb-4">Thông báo</h3>
//         <Notifications notifications={notifications} />
//       </div>
//     </aside>
//   );
// }

// export default SidebarAppointment;
