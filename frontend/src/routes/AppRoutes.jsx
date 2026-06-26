import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ApartmentDashboard from "../pages/ApartmentDashboard";
import AddGuestPage from "../pages/AddGuestPage";
import MyGuestListPage from "../pages/MyGuestListPage";
import ProfilePage from "../pages/ProfilePage";
import SecurityDashboard from "../pages/SecurityDashboard";
import VisitorListPage from "../pages/VisitorListPage";
import ApartmentListPage from "../pages/ApartmentListPage";
import AllGuestPage from "../pages/AllGuestPage";
import AdminDashboard from "../pages/AdminDashboard";
import AdminAddGuestPage from "../pages/AdminAddGuestPage";
import AllVisitorListPage from "../pages/AllVisitorListPage";
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Admin routes */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/apartments" element={<ApartmentListPage />} />
                <Route path="/all-guests" element={<AllGuestPage />} />
                <Route path="/admin-add-guest" element={<AdminAddGuestPage />} />

                {/* Security routes */}
                <Route path="/security-dashboard" element={<SecurityDashboard />} />
                <Route path="/visitors" element={<VisitorListPage />} />
                <Route path="/all-visitors" element={<AllVisitorListPage />} />
                {/* Apartment routes */}
                <Route path="/dashboard" element={<ApartmentDashboard />} />
                <Route path="/add-guest" element={<AddGuestPage />} />
                <Route path="/my-guests" element={<MyGuestListPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                <Route path="*" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
