import { createSlice } from '@reduxjs/toolkit';

const LS_THEME = 'theme';

const initialTheme = sessionStorage.getItem(LS_THEME) || 'light';

const initialState = {
  mode: initialTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
      sessionStorage.setItem(LS_THEME, action.payload);
    },
    toggleMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      sessionStorage.setItem(LS_THEME, state.mode);
    },
  },
});

export const { setMode, toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
