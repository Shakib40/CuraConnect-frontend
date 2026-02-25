import { useEffect } from "react";
import { Routes, Route, Navigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "./store/slices/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalStickyNotes from "./components/StickyNotes";
import PatientRoutes from "./pages/Patient";
import DoctorRoutes from "./pages/Doctor";
import HospitalAdminRoutes from "./pages/HospitalAdmin";
import SuperAdminRoutes from "./pages/SuperAdmin";
import MedicineSupplierRoutes from "./pages/MedicineSupplier";
import WelcomePage from "pages/WelcomePage";
import AuthRoutes from "pages/Auth";


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
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/auth" element={<AuthRoutes />} />
        <Route path="/welcome" element={<WelcomePage />} />

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

        {/* Hospital Admin Routes */}
        <Route
          path="/hospital-admin/*"
          element={
            <ProtectedRoute allowedRoles={["hospital-admin"]}>
              <HospitalAdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* Medicine Supplier Routes */}
        <Route
          path="/medicine-supplier/*"
          element={
            <ProtectedRoute allowedRoles={["medicine-supplier"]}>
              <MedicineSupplierRoutes />
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
