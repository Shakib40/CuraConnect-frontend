import { Bell, Search, User, LogOut, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ title, showSearch = false, showEarnings = false }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-slate-800 hidden md:block">
          {title || "Dashboard"}
        </h1>

        {showSearch && (
          <div className="relative hidden md:block">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Global Search..."
              className="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all w-64 outline-none"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {showEarnings && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">
            <span>Month Earnings:</span>
            <span>$12,450</span>
          </div>
        )}

        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pl-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <span className="text-sm font-medium text-slate-700 hidden sm:block">
              {user?.name}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 py-1 z-50">
              <div className="px-4 py-2 border-b border-slate-100 mb-1">
                <p className="text-sm font-medium text-slate-800">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {user?.role}
                </p>
              </div>
              <button
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                onClick={() => {
                  /* Navigate to profile */
                }}
              >
                <User className="w-4 h-4" /> Profile Details
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
