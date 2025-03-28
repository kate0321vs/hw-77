export interface Note {
    author: string;
    message: string;
    image: string | null;
    id: string;
}

export interface NoteMutation {
    author: string;
    message: string;
    image: File | null;
}