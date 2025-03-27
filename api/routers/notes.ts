import express from 'express';
import fileDb from "../fileDb";
import {TNoteWithoutId} from "../type";
import {imagesUpload} from "../multer";
const notesRouter = express.Router();


notesRouter.get('/', async (req, res) => {
    const notes = await fileDb.getItems();
    res.send(notes);
});

notesRouter.post('/', imagesUpload.single('image') , async (req, res) => {
    if (!req.body.message) {
        res.status(400).send({'error': 'Fields message required'});
        return;
    }

    const note: TNoteWithoutId = {
        author: req.body.author,
        message: req.body.message,
        image: req.file ? 'images/' + req.file.filename : null,
    };
    const savedNote = await fileDb.addItem(note)

    res.send(savedNote);
});

export default notesRouter;
