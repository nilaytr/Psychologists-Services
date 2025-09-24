import { createSlice } from "@reduxjs/toolkit";

const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        items: savedFavorites,
    },
    reducers: {
        addFavorite(state, action) {
            const existFavorite = state.items.find((favorite) => favorite.id === action.payload.id);

            if (existFavorite) {
                state.items = state.items.filter((favorite) => favorite.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }

            localStorage.setItem("favorites", JSON.stringify(state.items));
        },
        removeFavorite(state, action) {
            state.items = state.items.filter((favorite) => favorite.id !== action.payload.id);
            localStorage.setItem("favorites", JSON.stringify(state.items));
        },
        clearFavorites(state) {
            state.items = [];
            localStorage.removeItem("favorites");
        },
    },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;