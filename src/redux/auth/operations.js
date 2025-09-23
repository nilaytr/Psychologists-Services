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
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = response.user;
            await updateProfile(user, { displayName: name });
            return user;
        } catch (error) {
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
            return user;
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
            return;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);