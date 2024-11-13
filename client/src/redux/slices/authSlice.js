import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    userInfo: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { user, token } = action.payload;
            state.token = token;
            state.userInfo = JSON.parse(user);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
