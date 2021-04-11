import { Store, useStore, useStores } from "./Store";
import Sermon from "util/Sermon";

const sermonsStore = new Store<Sermon[]>(JSON.parse(localStorage.getItem('sermons') || "[]").map((item: { id: string; title: string; content: string; }) => new Sermon(item)));

sermonsStore.subscribe((o,sermons) => {
    console.log("saving to localStorage",sermons)
    localStorage.setItem('sermons', JSON.stringify(sermons));
});

export function useSermons() {
    return useStore(sermonsStore);
}

export function useSermon(id: string) {
    const [sermons, setSermons] = useSermons();

    const theSermonIndex = sermons.findIndex(sermon => sermon.id === id);
    if (theSermonIndex === -1) {
        return [null,null];
    }
    const theSermon = sermons[theSermonIndex];

    const setTheSermon = (v: Sermon) => {
        setSermons([...sermons.slice(0,theSermonIndex),v,...sermons.slice(theSermonIndex+1)]);
    }

    const returnValue : [Sermon, (v: Sermon) => void] = [theSermon,setTheSermon];
    return returnValue;
}

export function createSermon({title}: {title: string}) {
    const ids = sermonsStore.state.map(item => item.id);

    const generateId = (num: number) : string => {
        if (ids.indexOf(num+"") !== -1) {
            return generateId(num+1);
        }
        else {
            return num+""
        }
    }

    const theSermon = new Sermon({id: generateId(0), title: title, content: ""});
    sermonsStore.update((oldSermons) => [...oldSermons,theSermon]);

    return theSermon;
}

export function deleteSermon(sermon: Sermon) {
    const id = sermon.id;
    sermonsStore.update((old) => old.filter(i => i.id !== id));
}