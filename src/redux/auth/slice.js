import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "./operations";

const handlePending = (state) => {
    state.loading = true;
    state.error = null;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload || action.error?.message;
};

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, handlePending)
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, handleRejected)

            .addCase(loginUser.pending, handlePending)
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, handleRejected)
        
            .addCase(logoutUser.pending, handlePending)
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, handleRejected)
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;