import { Store, useStores } from "./Store";
import bible, { BibleVerse } from "util/Bible";

const allVerses = [];
for (let verse of bible.allVerses()) {
    allVerses.push(verse);
}

function highlightPersistanceId(verse: BibleVerse): string {
    return `bible-highlights-${verse.id}`;
}

function initialHighlights(verse: BibleVerse) {
    return JSON.parse(localStorage.getItem(highlightPersistanceId(verse)) || "{}");
}

const highlightStores = Object.fromEntries(allVerses.map(item => [item.id, new Store(initialHighlights(item))]));

export function useHighlights(verseArray: BibleVerse[]) {
    const [highlights, setHighlights] = useStores(Object.fromEntries(verseArray.map(verse => [verse.id, highlightStores[verse.id]])));

    function highlightedText(verse: BibleVerse) {
        return verse.text.split("").map((char, id) => ({ char, highlight: highlights[verse.id][id] || "transparent" }));
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