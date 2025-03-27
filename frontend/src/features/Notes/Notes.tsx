import NoteForm from "./components/NoteForm/NoteForm.tsx";
import {Container, Typography} from "@mui/material";

const Notes = () => {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mb: 3 }} textAlign='center'>Add new note</Typography>
            <NoteForm/>
        </Container>
    );
};

export default Notes;