import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../store/features/authSlice';
import axiosInstance from '../utils/axiosInstance';

export default function Dashboard() {
  const {user, refreshToken} = useSelector((state) => state.auth);
   
  
   const dispatch = useDispatch();

  const handleLogout = async (event) => {
    event.preventDefault();
    try{
     await axiosInstance.post(`/auth/logout?refreshToken=${refreshToken}`);
    dispatch(logoutSuccess());
    sessionStorage.clear();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };


  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      <div>
        Welcome: {user?.firstname} {user?.lastname} ({user?.role})
      </div>

      {user?.role === 'ADMIN' ? (
        <div style={{ marginTop: 12 }}>
          <Link to="/admin">Go to Admin Dashboard</Link>
        </div>
      ) : null}

      <button style={{ marginTop: 12 }} onClick={(event)=> handleLogout(event)}>
        Logout
      </button>
    </div>
  );
}
