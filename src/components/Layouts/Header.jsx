import { Bell, Search, User, LogOut, ChevronDown, Sun, Moon, Info, AlertTriangle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/slices/authSlice";
import { toggleTheme } from "store/slices/themeSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const Header = ({ title, showSearch = false, showEarnings = false }) => {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Mock recent notifications for dropdown
  const recentNotifications = [
    {
      id: 1,
      title: "Critical Case Escalated",
      description: "Case CASE-2024-004 has been escalated to priority support",
      timestamp: "2024-01-23T08:15:00Z",
      status: "error",
      priority: "critical",
      read: false,
      type: "case"
    },
    {
      id: 2,
      title: "Quality Alert",
      description: "MediCare Pharmaceuticals batch failed quality inspection",
      timestamp: "2024-01-23T09:30:00Z",
      status: "warning",
      priority: "high",
      read: false,
      type: "supplier"
    },
    {
      id: 3,
      title: "New Hospital Registration",
      description: "City General Hospital has completed registration",
      timestamp: "2024-01-23T12:15:00Z",
      status: "info",
      priority: "medium",
      read: true,
      type: "hospital"
    }
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatNotificationTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMinutes < 1) {
      return "Just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "info":
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
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

        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <div ref={notificationRef} className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 z-[60]">
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-800">Notifications</h3>
                  <button
                    onClick={() => navigate("/superadmin/notifications")}
                    className="text-sm text-primary hover:text-primary/600 font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {recentNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className="p-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 cursor-pointer transition-colors"
                    onClick={() => navigate("/superadmin/notifications")}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getStatusIcon(notification.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-slate-800 text-sm">{notification.title}</h4>
                          <span className="text-xs text-slate-500">{formatNotificationTime(notification.timestamp)}</span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-2">{notification.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-slate-100">
                <button
                  onClick={() => navigate("/superadmin/notifications")}
                  className="w-full text-center text-sm text-primary hover:text-primary/600 font-medium py-2"
                >
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

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
            <div ref={profileRef} className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 py-1 z-50">
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
