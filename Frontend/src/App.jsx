import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedAuth";
import OAuthSuccess from "./hook/oAuth.jsx";
import AddSkills from "./pages/AddSkills.jsx";
import Jobs from "./pages/Jobs.jsx";
import Resume from "./pages/Resume.jsx"
import SavedJobs from "./pages/SavedJobs.jsx";
import Loading from "./Components/PageLoad.jsx";
import Message from "./pages/Message.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";




function App() {
  const { user, loading } = useAuth() ;

  if (loading) return <Loading/>;

  return (
    <BrowserRouter>
      <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          borderRadius: "12px",
          background: "#1A0B3B",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "500",
        },
        success: {
          iconTheme: {
            primary: "#818CF8",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#818CF8",
            secondary: "#fff",
          },
          duration: 5000,
        },
      }}
    />
      <Routes>

        <Route path="/" element={<Home />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/verify-email" element={<VerifyEmail />} />

         <Route path="/oauth-success" element={<OAuthSuccess />} />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <Resume/>
            </ProtectedRoute>
          }
        />

         <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute>
              <SavedJobs/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/skills"
          element={
            <ProtectedRoute>
             <AddSkills/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
