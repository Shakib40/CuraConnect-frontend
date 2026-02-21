import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
 
    loginSuccess: (state, action) => {
      state.user = action.payload?.user ?? null;
      state.token = action.payload?.accessToken ?? null;
      state.refreshToken = action.payload?.refreshToken ?? null;
     },
 
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
