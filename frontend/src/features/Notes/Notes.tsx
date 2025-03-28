import NoteForm from "./components/NoteForm/NoteForm.tsx";
import {Container, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectNotes} from "./notesSlice.ts";
import NoteItem from "./components/NoteItem/NoteItem.tsx";
import {useEffect} from "react";
import {fetchNotes} from "./notesThukn.ts";

const Notes = () => {
    const dispatch = useAppDispatch();
    const notesList = useAppSelector(selectNotes);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ my: 3 }} textAlign='center'>Add new note</Typography>
            <NoteForm/>
            <Typography variant="h4" sx={{ my: 3 }} textAlign='center'>Notes List</Typography>
            {notesList ?
            notesList.map((note) => (
                <NoteItem key={note.id} author={note.author} message={note.message} image={note.image} />
            )) :
                <Typography>No notes yet</Typography>
            }
        </Container>
    );
};

export default Notes;