import {createSlice} from "@reduxjs/toolkit";
import {Note} from "../types";
import {createNote, fetchNotes} from "./notesThukn.ts";
import {RootState} from "../app/store.ts";

interface NotesState {
    items: Note[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: NotesState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
};

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchNotes.fulfilled, (state, {payload: notes}) => {
            state.fetchLoading = false;
            state.items = notes;
        });
        builder.addCase(fetchNotes.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(createNote.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createNote.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createNote.rejected, (state) => {
            state.createLoading = false;
        });
    },
});

export const notesReducer = notesSlice.reducer;
export const selectNotes = (state: RootState) => state.notes.items;
export const selectFetchNotes = (state: RootState) => state.notes.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.notes.createLoading;