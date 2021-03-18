import { Store, useStores } from "./Store";
import bible, { BibleChapter, BibleVerse } from "util/Bible";

import { useMemo } from "react";

const allVerses = [];
for (let verse of bible.allVerses()) {
    allVerses.push(verse);
}

function highlightPersistanceId(verse: BibleVerse): string {
    return `bible-highlights-${verse.id}`;
}

function initialHighlights(verse: BibleVerse) {
    return JSON.parse(localStorage.getItem(highlightPersistanceId(verse)) || "{}") as { [k: number]: string };
}

//const highlightStores = Object.fromEntries(allVerses.map(item => [item.id, new Store(initialHighlights(item))]));
const highlightStores = new Proxy<{ [k: string]: Store<{ [k: number]: string; }> }>({}, {
    get(target, name, reciever) {
        if (typeof name === "string") {
            return target[name] || (target[name] = new Store(initialHighlights(BibleVerse.fromId(name))))
        }
        else {
            throw "You've got a problem"
        }
    }
});

export function useHighlights(verseArray: BibleVerse[]) {
    const stores = useMemo(() => Object.fromEntries(verseArray.map(verse => [verse.id, highlightStores[verse.id]])), [verseArray.map(item => item.id).join("&")])
    const [highlights, setHighlights] = useStores(stores);

    function highlightedText(verse: BibleVerse) {
        return verse.text.split("").map((char, id) => ({ char, highlight: highlights[verse.id]?.[id] || "transparent" }));
    }

    function updateHighlights(verse: BibleVerse, obj: { [k: number]: string }) {
        const newHighlights = { ...highlights[verse.id], ...obj }
        localStorage.setItem(highlightPersistanceId(verse), JSON.stringify(newHighlights));
        setHighlights(verse.id, newHighlights)
    }

    function highlightWholeVerse(verse: BibleVerse, color: string) {
        updateHighlights(verse, Object.fromEntries(verse.text.split("").map((item, index) => [index, color])))
    }

    return {
        highlightedText,
        updateHighlights,
        highlightWholeVerse
    }
}

export function useHighlight(verse: BibleVerse) {
    const {
        highlightedText,
        updateHighlights,
        highlightWholeVerse
    } = useHighlights([verse]);

    return {
        highlightedText() {
            return highlightedText(verse);
        },
        updateHighlights(obj: { [k: number]: string }) {
            return updateHighlights(verse, obj);
        },
        highlightWholeVerse(color: string) {
            return highlightWholeVerse(verse, color);
        }
    }
}