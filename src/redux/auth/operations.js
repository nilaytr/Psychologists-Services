import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
//import { toast } from "react-hot-toast";

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, password }, thunkAPI) => {
        try {
            console.log("Register attempt:", email, password);
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = response.user;
            await updateProfile(user, { displayName: name });

            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            };
        } catch (error) {
            console.error("Register error:", error.code, error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = response.user;

            return {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkAPI) => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);