import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { HSStaticMethods } from 'preline/preline';
import axios from 'axios';

import { store } from './store/store';
import { loginSuccess, logoutSuccess } from './store/features/authSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

function AppInit({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  const location = useLocation();

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const refreshToken = sessionStorage.getItem('refreshToken') || null;
        if (!refreshToken) {
          if (cancelled) return;
          dispatch(logoutSuccess());
          return;
        }else {
          const response = await axios.post('http://localhost:8080/api/auth/refresh?refreshToken=' + refreshToken);
          const user = response?.data;

          if (cancelled) return;
          dispatch(loginSuccess({ user: user?.user, refreshToken: user?.refreshToken, token: user?.token }));

           if (response?.data?.user?.role === 'ADMIN') {
            navigate('/admin', { replace: true });
           }else {
            navigate('/dashboard', { replace: true });
           }
        }
        
      } catch (err) {
        if (cancelled) return;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
        dispatch(logoutSuccess());
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  React.useEffect(() => {
    const rootEl = document.documentElement;
    if (mode === 'dark') rootEl.classList.add('dark');
    else rootEl.classList.remove('dark');
  }, [mode]);

  React.useEffect(() => {
    // Re-init Preline components after route changes
    if (typeof window !== 'undefined') {
      HSStaticMethods.autoInit();
    }
  }, [location.pathname]);

  return children;
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppInit>
          <App />
        </AppInit>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
