export interface INote {
    id: string;
    author: string;
    message: string;
    image: string | null;
}

export type TNoteWithoutId = Omit<INote, 'id'>