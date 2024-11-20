import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sessionExpired: false,
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSessionExpired: (state, action) => {
            state.sessionExpired = true;
        },
        resetSession: (state, action) => {
            state.sessionExpired = false;
        },
    },
});

export const { setSessionExpired, resetSession } = sessionSlice.actions;

export default sessionSlice.reducer;
