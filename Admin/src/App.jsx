import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./page/Adminlogin";
import AdminDashboard from "./page/AdminDashBorad";
import AdminMessages from "./page/AdminMessage";

const isAdminLoggedIn = () => {
  return !!localStorage.getItem("adminToken");
};

const PrivateRoute = ({ children }) => {
  return isAdminLoggedIn() ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route path="/admin/messages"
       element={
        <PrivateRoute>
        <AdminMessages />
        </PrivateRoute>
        } />
    </Routes>
  );
}

export default App;
