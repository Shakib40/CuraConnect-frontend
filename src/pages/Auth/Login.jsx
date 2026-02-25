
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "store/slices/authSlice";

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
    <div className="flex h-screen">
      {/* Left Side - Animation */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <span className="text-white font-bold text-3xl">C</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">CuraConnect</h1>
              <p className="text-xl text-white/90 mb-8">
                Connecting Healthcare, Simplifying Supply Chains
              </p>
            </div>

            {/* Animated Elements */}
            <div className="relative h-64 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-white/10 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white/20 rounded-full animate-ping"></div>
              </div>
              <div className="relative z-10">
                <div className="w-24 h-24 bg-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <p className="text-white/80">✓ Multi-Role Healthcare Platform</p>
              <p className="text-white/80">✓ Secure & Compliant System</p>
              <p className="text-white/80">✓ Real-Time Analytics</p>
              <p className="text-white/80">✓ 24/7 Support</p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600">
              Choose your role to access the CuraConnect platform
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleLogin("patient")}
              className="group px-6 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium flex items-center justify-between"
            >
              <span>Login as Patient</span>
              <span className="text-teal-200 group-hover:text-teal-100">→</span>
            </button>
            <button
              onClick={() => handleLogin("doctor")}
              className="group px-6 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium flex items-center justify-between"
            >
              <span>Login as Doctor</span>
              <span className="text-sky-200 group-hover:text-sky-100">→</span>
            </button>
            <button
              onClick={() => handleLogin("hospital-admin")}
              className="group px-6 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium flex items-center justify-between"
            >
              <span>Login as Hospital Admin</span>
              <span className="text-slate-400 group-hover:text-slate-300">→</span>
            </button>
            <button
              onClick={() => handleLogin("medicine-supplier")}
              className="group px-6 py-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium flex items-center justify-between"
            >
              <span>Login as Medicine Supplier</span>
              <span className="text-slate-400 group-hover:text-slate-300">→</span>
            </button>
            <button
              onClick={() => handleLogin("superadmin")}
              className="group px-6 py-4 bg-teal-800 hover:bg-teal-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium flex items-center justify-between"
            >
              <span>Login as SuperAdmin</span>
              <span className="text-teal-200 group-hover:text-teal-100">→</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500"
            onClick={() => navigate('/auth/register')}
            >
              Register
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Demo Mode - Click any role to access the dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;