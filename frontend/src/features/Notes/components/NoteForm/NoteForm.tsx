import {Button, CircularProgress, Grid, TextField} from "@mui/material";
import FileInput from "../../../../components/UI/FileInput/FileInput.tsx";
import { NoteMutation } from "../../../../types";
import {useState} from "react";
import {selectCreateLoading} from "../../notesSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {createNote} from "../../notesThukn.ts";
import {useNavigate} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';

const initialState = {
    author: '',
    message: '',
    image: null,
}

const NoteForm = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectCreateLoading)
    const [state, setState] = useState<NoteMutation>(initialState);
    const navigate = useNavigate();

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createNote(state));
        navigate('/')
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
                    <Grid item xs>
                        <TextField
                            id="author" label="Author"
                            value={state.author}
                            onChange={inputChangeHandler}
                            name="author"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            id="message" label="Message"
                            value={state.message}
                            onChange={inputChangeHandler}
                            name="message"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs>
                        <FileInput onChange={filesInputChangeHandler} name='image' label='image' />
                    </Grid>
                    <Grid item xs>
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