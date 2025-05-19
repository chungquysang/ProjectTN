import { Routes, Route, Navigate } from "react-router-dom";
import { HealthCheck, AppointmentSchedule, Reports, Settings } from "../Pages/Doctor_page/controllerRouter";
import { Dashboard, MedicalRegistration, PatientReception, Appointments, ProfilePatient, Paymanent } from "../Pages/Receptionist_page/controllerRouter";
import { DashboardAdmin, Account, MedicineManagement, ServiceAdmin, MedicalTestAdmin, DoctorAdmin, RoleAdmin, ProfileAD } from "../Pages/Admin_page/controllerRouter";
import { Home, DashboardAppointment, RegisterAppointment, AppointmentRegistration } from "../Pages/Appointment_page/controllerRouter";
import PrivateRoute from "../Components/PrivateRoute";
import SignupPage from "../Pages/SignupPage";
import Profile from "../Pages/Profile";
import Logout from "../Pages/Logout";
import ForgotPassword from "../Pages/ForgotPassword";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/Login" element={<SignupPage />} />
      <Route path="/Logout" element={<Logout />} />
      <Route path="/" element={<Navigate to="login" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<RegisterAppointment />} />
      <Route path="/medicalRegistration" element={<AppointmentRegistration />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />


      <Route path="/profile" element={<PrivateRoute allowedRoles={["DOCTOR", "RECEPTIONIST"]} redirectPath="/Login"><Profile /></PrivateRoute>} />


      <Route path="/Home/DashboardAppointment/:tab?" element={<PrivateRoute allowedRoles={["USER"]} redirectPath="/Login"><DashboardAppointment /></PrivateRoute>} />
      <Route path="/Home/DashboardAppointment/AppointmentRegistration" element={<PrivateRoute allowedRoles={["USER"]} redirectPath="/Login"><AppointmentRegistration /></PrivateRoute>} />


      <Route path="/HealthCheck_BS" element={<PrivateRoute allowedRoles={["DOCTOR"]} redirectPath="Login"><HealthCheck /></PrivateRoute>} />
      <Route path="/Appointments_BS" element={<PrivateRoute allowedRoles={["DOCTOR"]} redirectPath="Login"><AppointmentSchedule /></PrivateRoute>} />
      <Route path="/Reports_BS" element={<PrivateRoute allowedRoles={["DOCTOR"]} redirectPath="Login"><Reports /></PrivateRoute>} />
      <Route path="/settings_BS" element={<PrivateRoute allowedRoles={["DOCTOR"]} redirectPath="Login"><Settings /></PrivateRoute>} />


      <Route path="/Dashboard" element={<PrivateRoute allowedRoles={["RECEPTIONIST"]} redirectPath="Login"><Dashboard /></PrivateRoute>} />
      <Route path="/MedicalRegistration_LT" element={<PrivateRoute allowedRoles={["RECEPTIONIST"]} redirectPath="Login"><MedicalRegistration /></PrivateRoute>} />
      <Route path="/PatientReception_LT" element={<PrivateRoute allowedRoles={["RECEPTIONIST"]} redirectPath="Login"><PatientReception /></PrivateRoute>} />
      <Route path="/Appointments_LT" element={<PrivateRoute allowedRoles={["RECEPTIONIST"]} redirectPath="Login"><Appointments /></PrivateRoute>} />
      <Route path="/PatientRecords_LT" element={<PrivateRoute allowedRoles={["RECEPTIONIST"]} redirectPath="Login"><ProfilePatient /></PrivateRoute>} />
      <Route path="/HospitalFees_LT" element={<PrivateRoute allowedRoles={["RECEPTIONIST"]} redirectPath="Login"><Paymanent /></PrivateRoute>} />




      <Route path="/Admin/Dashboard" element={<PrivateRoute allowedRoles={["ADMIN"]} redirectPath="/Login"><DashboardAdmin /></PrivateRoute>} />
      <Route path="/Admin/users/account" element={<PrivateRoute allowedRoles={["ADMIN"]} redirectPath="/Login"><Account /></PrivateRoute>} />
      <Route path="/Admin/medicine" element={<PrivateRoute allowedRoles={["ADMIN"]} redirectPath="/Login"><MedicineManagement /></PrivateRoute>} />
      <Route path="/Admin/service" element={<PrivateRoute allowedRoles={["ADMIN"]} redirectPath="/Login"><ServiceAdmin /></PrivateRoute>} />
      <Route path="/Admin/medicaltest" element={<PrivateRoute allowedRoles={["ADMIN"]} redirectPath="/Login"><MedicalTestAdmin /></PrivateRoute>} />
      <Route path="/Admin/users/staff" element={<PrivateRoute allowedRoles={["ADMIN"]} redirectPath="/Login"><DoctorAdmin /></PrivateRoute>} />
      <Route path="/Admin/users/decentralize" element={<PrivateRoute allowedRoles={["ADMIN"]} redirectPath="/Login"><RoleAdmin /></PrivateRoute>} />
      <Route path="/Admin/information" element={<PrivateRoute allowedRoles={["ADMIN"]} redirectPath="/Login"><ProfileAD /></PrivateRoute>} />
    </Routes>
  );
};

export default AppRouter;
