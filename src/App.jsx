import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, initializeAuth } from "./store/slices/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalStickyNotes from "./components/StickyNotes";
import PatientRoutes from "./pages/Patient";
import DoctorRoutes from "./pages/Doctor";
import HospitalAdminRoutes from "./pages/HospitalAdmin";
import SuperAdminRoutes from "./pages/SuperAdmin";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    const mockToken = "mock_token_string";
    localStorage.setItem("userRole", role);
    localStorage.setItem("token", mockToken);

    dispatch(
      setAuth({
        user: {
          role,
          name: `Mock ${role.charAt(0).toUpperCase() + role.slice(1)}`,
        },
        token: mockToken,
      }),
    );

    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 bg-slate-50">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">
        CuraConnect Platform
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => handleLogin("patient")}
          className="px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow transition-colors font-medium"
        >
          Login as Patient (Demo)
        </button>
        <button
          onClick={() => handleLogin("doctor")}
          className="px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg shadow transition-colors font-medium"
        >
          Login as Doctor (Demo)
        </button>
        <button
          onClick={() => handleLogin("hospital-admin")}
          className="px-4 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg shadow transition-colors font-medium"
        >
          Login as Hospital Admin (Demo)
        </button>
        <button
          onClick={() => handleLogin("superadmin")}
          className="px-4 py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-lg shadow transition-colors font-medium"
        >
          Login as SuperAdmin (Demo)
        </button>
      </div>
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  if (loading) return null; // Or a global loading spinner

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Patient Routes */}
        <Route
          path="/patient/*"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientRoutes />
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor/*"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorRoutes />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/hospital-admin/*"
          element={
            <ProtectedRoute allowedRoles={["hospital-admin"]}>
              <HospitalAdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* SuperAdmin Routes */}
        <Route
          path="/superadmin/*"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
      <GlobalStickyNotes />
    </>
  );
}

export default App;
