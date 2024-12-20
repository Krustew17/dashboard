import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import sessionReducer from "../redux/slices/sessionSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        session: sessionReducer,
    },
});

export default store;
