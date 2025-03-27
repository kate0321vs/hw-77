import {createAsyncThunk} from "@reduxjs/toolkit";
import {Note, NoteMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchNotes = createAsyncThunk<Note[]>(
    'notes/fetchAll',
    async () => {
        const notesResponse = await axiosApi.get<Note[]>('/notes');
        return notesResponse.data;
    }
);

export const createNote = createAsyncThunk<void, NoteMutation>(
    'notes/create',
    async (NoteMutation) => {
        const formData = new FormData();
        const keys = Object.keys(NoteMutation) as (keyof NoteMutation)[];

        keys.forEach((key) => {
            const value = NoteMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        })

        await axiosApi.post('/notes', formData);
    }
)