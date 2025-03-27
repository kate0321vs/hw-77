import express from "express";
import fileDb from "./fileDb";
import cors from "cors";
import notesRouter from "./routers/notes";

const app = express();
const port = 8000;

app.use(cors())
app.use(express.static("public"));
app.use(express.json());
app.use('/notes', notesRouter);

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

run().catch((err) => console.error(err));