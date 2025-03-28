import {Button, CircularProgress, TextField} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";
import { NoteMutation } from "../../../../types";
import {useState} from "react";
import {selectCreateLoading} from "../../notesSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {createNote, fetchNotes} from "../../notesThukn.ts";
import SendIcon from '@mui/icons-material/Send';
import {toast} from "react-toastify";

const initialState = {
    author: '',
    message: '',
    image: null,
}

const NoteForm = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCreateLoading)
    const [state, setState] = useState<NoteMutation>(initialState);

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (state.message.trim().length === 0) {
            alert("Please enter message");
            return;
        }
        await dispatch(createNote(state));
        toast.success('Contact was added Successfully!');
        await dispatch(fetchNotes());
        setState(initialState);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setState(prevState => {
                return {...prevState,
                    [name]: files[0]};
            })
        }
    };



    return (
        <>
            <form
                autoComplete="off"
                onSubmit={submitFormHandler}
            >
                <Grid container direction="column" spacing={2}>
                    <Grid item >
                        <TextField
                            id="author" label="Author"
                            value={state.author}
                            onChange={inputChangeHandler}
                            name="author"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="message" label="Message"
                            value={state.message}
                            onChange={inputChangeHandler}
                            name="message"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item>
                        <FileInput onChange={filesInputChangeHandler} name='image' label='image'/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            endIcon={loading ? <CircularProgress size={24}/> : <SendIcon/>}
                            size="small"
                            disabled={loading}
                            variant="contained"
                            type="submit"
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default NoteForm;