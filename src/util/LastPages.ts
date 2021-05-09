const lastPages = {
    get bible() : string {
        return localStorage.getItem('last-bible-route') || "";
    },

    set bible(param: string) {
        localStorage.setItem('last-bible-route',param);
    },

    get sermons(): string {
        return localStorage.getItem('last-sermons-route') || "";
    },

    set sermons(param:string) {
        localStorage.setItem('last-sermons-route',param);
    }
}

export default lastPages