class Document {
    id: number;
    title: string;
    description: string;
    pos: number;

    constructor(
        id: number, 
        title: string, 
        description: string,
        pos: number
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.pos = pos;
    }
}

export default Document;
