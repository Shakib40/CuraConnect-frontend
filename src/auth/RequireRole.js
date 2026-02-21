import { Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function RequireRole({ roles }) {
  const user = useSelector((s) => s.auth.user);
  const booting = useSelector((s) => s.auth.status) === 'loading';

  if (booting) return <div style={{ padding: 16 }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
