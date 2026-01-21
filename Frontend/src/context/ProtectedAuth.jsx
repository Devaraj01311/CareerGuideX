import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="h-10 w-10 border-4 size-px border-blue-200 border-t-blue-600 rounded-full animate-spin" />; // show while checking

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
