import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DarkModeSwitch from '../components/DarkModeSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../store/features/authSlice';
import axios from 'axios';

export default function AdminLayout() {
  const {user, refreshToken, token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const handleLogout = async (event) => {
    event.preventDefault();
    try{
      await axios.post(
  `http://localhost:8080/api/auth/logout?refreshToken=${refreshToken}`,
  {}, 
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
    dispatch(logoutSuccess());
    sessionStorage.clear();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
          <div className="font-semibold text-gray-900 dark:text-gray-100">Hotel Management</div>
          <div className="flex items-center gap-3">
            <DarkModeSwitch />
            <span className="text-sm text-gray-700 dark:text-gray-200">
              {user?.name} ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="rounded-md border border-gray-200 px-3 py-2 text-sm dark:border-gray-800 dark:text-gray-100"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
