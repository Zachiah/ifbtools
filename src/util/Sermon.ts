export default class Sermon {
    id: string;
    title: string;
    content: string;

    constructor(obj: {id: string, title: string, content: string}) {
        this.id = obj.id;
        this.title = obj.title;
        this.content = obj.content || "";
    }

    toJSON() {
        return {id: this.id, title: this.title, content: this.content}
    }

    fromJSON(json: string) {
        return new Sermon(JSON.parse(json));
    }
}