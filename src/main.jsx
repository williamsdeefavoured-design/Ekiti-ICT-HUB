import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Pages
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import AdminSignIn from "./pages/AdminSignIn.jsx";
import AdminSignUp from "./pages/AdminSignUp.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Enroll from "./pages/Enroll.jsx";
import MarkAttendanceModal from "./components/MarkAttendanceModal.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

// Notifications
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<App />} />

        {/* Auth */}
        <Route path="/admin-signin" element={<AdminSignIn />} />
        <Route path="/SignupPage" element={<AdminSignUp />} />

        {/* Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Enroll */}
        <Route path="/enroll" element={<Enroll />} />

        {/* Mark Attendance */}
        <Route path="/mark-attendance" element={<MarkAttendanceModal />} />

        {/* 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  </React.StrictMode>
);
