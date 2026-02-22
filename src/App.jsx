import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, initializeAuth } from "./store/slices/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientRoutes from "./pages/Patient";
import DoctorRoutes from "./pages/Doctor";
import AdminRoutes from "./pages/HospitalAdmin";

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
          onClick={() => handleLogin("admin")}
          className="px-4 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg shadow transition-colors font-medium"
        >
          Login as Admin (Demo)
        </button>
      </div>
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (loading) return null; // Or a global loading spinner

  return (
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
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
