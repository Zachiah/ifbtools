import { useLayoutEffect, useState } from "react";

type Subscriber<T> = (oldVal: T, newVal: T) => any;

export class Store<T> {
    private _state: T;
    private subscribers: { [k: number]: Subscriber<T> };
    private index: number;
    private static id: number = 0;
    id: number;

    constructor(initialValue: T) {
        this._state = initialValue;
        this.index = 0;
        this.subscribers = {};
        this.id = Store.id++;
    }

    private pingSubscribers(oldVal: T, newVal: T) {
        for (let id in this.subscribers) {
            this.subscribers[id](oldVal, newVal);
        }
    }

    update(newValue: ((old: T) => T) | T) {
        let newVal: T;
        if (newValue instanceof Function) {
            newVal = newValue(this._state);
        }
        else {
            newVal = newValue;
        }
        const oldVal = this._state;

        this._state = newVal;
        this.pingSubscribers(oldVal, newVal);

        return newVal;
    }

    /**subscribe to the store. @callback is called with [oldVal, and newVal] @returns a function that unsubscribes */
    subscribe(callback: Subscriber<T>) {
        const currentIndex = ++this.index;

        this.subscribers[currentIndex] = callback;

        const subscribers = this.subscribers;
        return function unsubscribe() {
            delete subscribers[currentIndex];
        }
    }

    get state() {
        return this._state;
    }
}

export function useStore<T>(store: Store<T>) {
    const [value, setValue] = useState(store.state);

    useLayoutEffect(() => {
        const unsubscribe = store.subscribe((oldVal, newVal) => {
            setValue(newVal);
        });
        return unsubscribe
    }, [store.id]);


    const newSetValue = (newVal: T | ((old: T) => T)) => {
        store.update(newVal);
    }
    const returnVal : [T, (newVal: T | ((old: T) => T)) => void] = [value,newSetValue];
    return returnVal;
}

export function useStores<T>(stores: { [k: string]: Store<T> }):
    [
        { [k: string]: T },
        (
            id: string,
            newVal: T | ((old: T) => T)
        ) => void
    ] {
    const [values, setValues] = useState(() => Object.fromEntries(Object.entries(stores).map(([id, store]) => [id, store.state])));
    const ids = [Object.entries(stores).map(item => item[1].id)];

    useLayoutEffect(() => {
        console.log("stores has changed")
        const unsubscribes = Object.entries(stores).map(([id, store]) => store.subscribe((oldVal, newVal) => {
            setValues((oldValues) => ({ ...oldValues, [id]: newVal }));
        }));

        return () => unsubscribes.forEach(item => item());
    }, [ids.join("-")]);


    const setNewValue = (id: string, newVal: T | ((old: T) => T)) => {
        stores[id].update(newVal)
    }

    const returnVal : [{[k: string]: T}, ((id: string, newVal: T | ((old: T) => T)) => void)] =  [values, setNewValue];

    return returnVal;
}