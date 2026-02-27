import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.auth)

  if (loading) return <div className='flex h-screen items-center justify-center'>Loading...</div>

  if (!isAuthenticated || !user) {
    return <Navigate to='/login' replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} replace />
  }

  return children
}

export default ProtectedRoute
