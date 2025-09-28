import { createSlice } from "@reduxjs/toolkit";

const psychologistsSlice = createSlice({
    name: "psychologists",
    initialState: {
        data: [],
        currentPage: 1,
        perPage: 3,
        filter: "",
    },
    reducers: {
        setPsychologists: (state, action) => {
            state.data = action.payload;
        },
        setPage: (state) => {
            state.currentPage += 1;
        },
        resetPage: (state) => {
            state.data = [];
            state.currentPage = 1;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { setPsychologists, setPage, resetPage, setFilter } = psychologistsSlice.actions;
export default psychologistsSlice.reducer;