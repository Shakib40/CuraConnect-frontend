import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const initialState = {
    theme: getInitialTheme(),
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.theme);

            // Secondary effect: update the document class
            const root = window.document.documentElement;
            if (state.theme === "dark") {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
            localStorage.setItem("theme", state.theme);

            const root = window.document.documentElement;
            if (state.theme === "dark") {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
