import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RequireAuth from './auth/RequireAuth';
import RequireRole from './auth/RequireRole';
import AdminLayout from './layouts/AdminLayout';

import Graph from './pages/admin/Graph';
import Users from './pages/admin/Users';
import AddUser from './pages/admin/AddUser';
import ActivityLogs from './pages/admin/ActivityLogs';
import ForgotPassword from './pages/admin/ForgotPassword';
import ResetPassword from './pages/admin/ResetPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route element={<RequireRole roles={['ADMIN']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="graph" replace />} />
            <Route path="graph" element={<Graph />} />
            <Route path="users" element={<Users />} />
            <Route path="users/add" element={<AddUser />} />
            <Route path="activity-logs" element={<ActivityLogs />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<div style={{ padding: 16 }}>Not Found</div>} />
    </Routes>
  );
}

export default App;
