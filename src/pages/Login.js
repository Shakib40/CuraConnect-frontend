import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginSuccess } from '../store/features/authSlice';

export default function Login() {
  const [username, setUserName] = useState('shakib410');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(
        `http://localhost:8080/api/auth/generate-otp?username=${username}`
      );

      setOtpSent(true);
      setOtp('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to generate OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/verify-otp?username=${username}&otp=${otp}`
      );

      sessionStorage.setItem('token', response?.data?.accessToken);
      sessionStorage.setItem('refreshToken', response?.data?.refreshToken);

      dispatch(loginSuccess(response?.data));

      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
        return;
      }

      if (response?.data?.user?.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm dark:bg-gray-900 dark:border-gray-800">
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          OTP Login
        </h2>

        {error && (
          <div className="mt-3 text-sm text-red-600">{error}</div>
        )}

        <form className="mt-6 space-y-4">

          {/* Username */}
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-200">
              Username
            </label>
            <input
              type="text"
              disabled={otpSent}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none 
              dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Show Generate OTP button */}
          {!otpSent && (
            <button
              onClick={handleGenerateOtp}
              disabled={loading || !username}
              className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Generate OTP'}
            </button>
          )}

          {/* Show OTP field after sent */}
          {otpSent && (
            <>
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-200">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm outline-none 
                  dark:bg-gray-950 dark:border-gray-800 dark:text-gray-100"
                  placeholder="6-digit OTP"
                  maxLength={6}
                  required
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length < 4}
                className="w-full rounded-md bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <button
                type="button"
                onClick={handleGenerateOtp}
                className="w-full text-sm text-blue-600 hover:underline"
              >
                Resend OTP
              </button>
            </>
          )}
        </form>

        <div className="mt-6 text-sm text-gray-700 dark:text-gray-200">
          No account?{' '}
          <Link className="text-blue-600 hover:underline" to="/register">
            Register
          </Link>
        </div>

      </div>
    </div>
  );
}
