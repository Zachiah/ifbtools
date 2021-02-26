const lastPages = {
    get bible() : string {
        return localStorage.getItem('last-bible-route') || "";
    },

    set bible(param: string) {
        localStorage.setItem('last-bible-route',param);
    }
}

export default lastPages