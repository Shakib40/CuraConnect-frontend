import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.loading = false
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.loading = false
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    initializeAuth: (state) => {
      const storedRole = localStorage.getItem('userRole')
      const storedToken = localStorage.getItem('token')

      if (storedRole && storedToken) {
        state.user = { role: storedRole, name: 'Mock User' }
        state.token = storedToken
        state.isAuthenticated = true
      }
      state.loading = false
    },
  },
})

export const { setAuth, logout, setLoading, initializeAuth } = authSlice.actions

export default authSlice.reducer
