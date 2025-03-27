import {promises as fs} from 'fs';
import { INote, TNoteWithoutId } from "./type";
import {randomUUID} from "node:crypto";

const pathName = './db.json';
let data: INote[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(pathName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            console.error(e);
            data = []
        }
    },
    async getItems() {
        return data
    },
    async addItem(item: TNoteWithoutId) {
        const note = {
            ...item,
            id: randomUUID(),
        }
        data.push(note);
        await this.save();
        return note.id;
    },
    async save() {
        await fs.writeFile(pathName, JSON.stringify(data));
    },
}

export default fileDb
