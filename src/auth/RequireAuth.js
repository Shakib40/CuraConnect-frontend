import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function RequireAuth() {
  const user = useSelector((s) => s.auth.user);
  const location = useLocation();
  const token = sessionStorage.getItem('token');

  if (!user || !token) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
