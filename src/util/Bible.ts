import bible from "../bible.json";

export type GConstructor<T = {}> = new (...args: any[]) => T;

// BookNameFormattable
export type BookNameFormatableType = GConstructor<{ _book: BibleBooks }>;
export type BookNameFormatable = { formattedBook: string };
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
function BookNameFormatable<TBase extends BookNameFormatableType>(Base: TBase) {
    return class BookNameFormatable extends Base {
        get formattedBook() {
            if (this._book === "songofsolomon") {
                return "Song of Solomon";
            }

            if (this._book.match(/\d/)) {
                return `${this._book[0]} ${this._book[1].toUpperCase()}${this._book.substring(2)}`;
            }
            return `${this._book[0].toUpperCase()}${this._book.substring(1)}`;
        }

        get bookShortName() {
            return ({
                "genesis": "gen",
                "exodus": "ex",
                "leviticus": "lev",
                "numbers": "num",
                "deuteronomy": "deut",
                "joshua": "josh",
                "judges": "judg",
                "ruth": "ruth",
                "1samuel": "1 sam",
                "2samuel": "2 sam",
                "1kings": "1 kgs",
                "2kings": "2 kgs",
                "1chronicles": "1 chr",
                "2chronicles": "2 chr",
                "ezra": "ezra",
                "nehemiah": "neh",
                "esther": "esth",
                "job": "job",
                "psalms": "pslm",
                "proverbs": "prov",
                "ecclesiastes": "eccl",
                "songofsolomon": "song",
                "isaiah": "isa",
                "jeremiah": "jer",
                "lamentations": "lam",
                "ezekiel": "ezek",
                "daniel": "dan",
                "hosea": "hos",
                "joel": "joel",
                "amos": "amos",
                "obadiah": "oba",
                "jonah": "jon",
                "micah": "mic",
                "nahum": "nah",
                "habakkuk": "hab",
                "zephaniah": "zeph",
                "haggai": "hag",
                "zechariah": "zech",
                "malachi": "mal",
                "matthew": "matt",
                "mark": "mark",
                "luke": "luke",
                "john": "john",
                "acts": "acts",
                "romans": "rom",
                "1corinthians": "1 cor",
                "2corinthians": "2 cor",
                "galatians": "gal",
                "ephesians": "eph",
                "philippians": "phil",
                "colossians": "col",
                "1thessalonians": "1 ths",
                "2thessalonians": "2 ths",
                "1timothy": "1 tim",
                "2timothy": "2 tim",
                "titus": "titus",
                "philemon": "phm",
                "hebrews": "heb",
                "james": "jas",
                "1peter": "1 pet",
                "2peter": "2 pet",
                "1john": "1 jn",
                "2john": "2 jn",
                "3john": "3 jn",
                "jude": "jude",
                "revelation": "rev",
            })[this._book].toUpperCase();
        }
    };
}

// Searchable
export type SearchableContract = GConstructor<{ allVerses(): Generator<BibleVerse> }>;
export type Searchable = { search(query: string, options: {}): Iterator<BibleVerse> };
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
function Searchable<TBase extends SearchableContract>(Base: TBase) {
    return class Searchable extends Base {
        *search(query: string, options: {}): Iterator<BibleVerse> {
            for (const verse of this.allVerses()) {
                if (verse.text.indexOf(query) !== -1) {
                    yield verse;
                }
            }
        }
    };
}


export type BibleBooks = ('genesis' | 'exodus' | 'leviticus' | 'numbers' | 'deuteronomy' |
    'joshua' | 'judges' | 'ruth' | '1samuel' | '2samuel' | '1kings' |
    '2kings' | '1chronicles' | '2chronicles' | 'ezra' | 'nehemiah' |
    'esther' | 'job' | 'psalms' | 'proverbs' | 'ecclesiastes' |
    'songofsolomon' | 'isaiah' | 'jeremiah' | 'lamentations' |
    'ezekiel' | 'daniel' | 'hosea' | 'joel' | 'amos' | 'obadiah' |
    'jonah' | 'micah' | 'nahum' | 'habakkuk' | 'zephaniah' |
    'haggai' | 'zechariah' | 'malachi' | 'matthew' | 'mark' |
    'luke' | 'john' | 'acts' | 'romans' | '1corinthians' |
    '2corinthians' | 'galatians' | 'ephesians' | 'philippians' |
    'colossians' | '1thessalonians' | '2thessalonians' | '1timothy' |
    '2timothy' | 'titus' | 'philemon' | 'hebrews' | 'james' |
    '1peter' | '2peter' | '1john' | '2john' | '3john' | 'jude' | 'revelation');


class BibleVerseBase {
    _book: BibleBooks;
    _chapter: number;
    _verse: number;
    text: string;

    constructor({ book, chapter, verse }: { book: BibleBooks, chapter: number, verse: number }) {
        this._book = book;
        this._chapter = chapter;
        this._verse = verse;
        this.text = bible[book].chapters[chapter - 1].verses[verse - 1].text;
    }

    get book() {
        return new BibleBook({ book: this._book });
    }

    get chapter() {
        return new BibleChapter({ book: this._book, chapter: this._chapter });
    }

    get verse() {
        throw new Error('You are using the verse getter on a BibleVerse this is not what. You want you already have the verse, did you mean ._verse?')
    }
}

let BibleVerse = BookNameFormatable(BibleVerseBase);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type BibleVerse = BookNameFormatable & BibleVerseBase;

class BibleChapterBase {
    _book: BibleBooks;
    _chapter: number;
    verses: BibleVerse[]

    constructor({ book, chapter }: { book: BibleBooks, chapter: number }) {
        this._book = book;
        this._chapter = chapter;
        this.verses = bible[book].chapters[chapter - 1].verses.map(item => new BibleVerse({ book, chapter, verse: +item.verse }));
    }

    get book() {
        return new BibleBook({ book: this._book });
    }

    get chapter() {
        throw new Error('You are using the chapter getter on a BibleChapter this is not what you want. You already have the chapter, did you mean ._chapter?')
    }

    getVerse(num: number) {
        return this.verses[num - 1];
    }

    *allVerses() {
        for (const verse of this.verses) {
            yield verse;
        }
    }

    get link() {
        return `/bible/${this._book}/${this._chapter}`;
    }

    get prev() {
        if (this._chapter === 1 && this._book === "genesis") {
            return new BibleChapter({
                book: "revelation",
                chapter: 22
            })
        }
        if (this._chapter === 1) {
            const bookName = theBible._books[theBible._books.indexOf(this._book) - 1]
            return new BibleChapter({
                book: bookName,
                chapter: theBible.books[bookName].chapters[theBible.books[bookName].chapters.length - 1]._chapter
            });
        }

        return new BibleChapter({
            book: this._book,
            chapter: this._chapter - 1
        });
    }

    get next() {
        if (this._book === "revelation" && this._chapter === 22) {
            return new BibleChapter({
                book: "genesis",
                chapter: 1
            })
        }
        if (this._chapter === this.book.chapters[this.book.chapters.length - 1]._chapter) {
            return new BibleChapter({
                book: theBible._books[theBible._books.indexOf(this._book) + 1],
                chapter: 1
            });
        }

        return new BibleChapter({
            book: this._book,
            chapter: this._chapter + 1
        })
    }


}
let BibleChapter = Searchable(BookNameFormatable(BibleChapterBase));
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type BibleChapter = BibleChapterBase & BookNameFormatable & Searchable;



class BibleBookBase {
    _book: BibleBooks;
    chapters: BibleChapter[];

    constructor({ book }: { book: BibleBooks }) {
        this._book = book;
        this.chapters = bible[book].chapters.map(item => new BibleChapter({ book, chapter: +item.chapter }))
    }

    get book() {
        throw new Error('You are using the book getter on a BibleBook this is not what you want you already have the chapter, did you mean. _book?')
    }

    getChapter(num: number) {
        return this.chapters[num - 1]
    }

    *allVerses() {
        for (const chapter of this.chapters) {
            for (const verse of chapter.verses) {
                yield verse;
            }
        }
    }
}

let BibleBook = Searchable(BookNameFormatable(BibleBookBase));
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type BibleBook = BibleBookBase & BookNameFormatable & Searchable;

class BibleBase {
    books: { [k: string]: BibleBook; };

    constructor() {
        this.books = Object.fromEntries(
            Object
                .keys(bible)
                .map(bookName => [
                    bookName as BibleBooks,
                    new BibleBook({ book: bookName as BibleBooks })
                ])
        );
    }

    get _books(): BibleBooks[] {
        return [
            'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy', 'joshua', 'judges', 'ruth',
            '1samuel', '2samuel', '1kings', '2kings', '1chronicles', '2chronicles', 'ezra', 'nehemiah',
            'esther', 'job', 'psalms', 'proverbs', 'ecclesiastes', 'songofsolomon', 'isaiah', 'jeremiah',
            'lamentations', 'ezekiel', 'daniel', 'hosea', 'joel', 'amos', 'obadiah', 'jonah', 'micah',
            'nahum', 'habakkuk', 'zephaniah', 'haggai', 'zechariah', 'malachi', 'matthew', 'mark',
            'luke', 'john', 'acts', 'romans', '1corinthians', '2corinthians', 'galatians', 'ephesians',
            'philippians', 'colossians', '1thessalonians', '2thessalonians', '1timothy', '2timothy', 'titus',
            'philemon', 'hebrews', 'james', '1peter', '2peter', '1john', '2john', '3john', 'jude', 'revelation'
        ]
    }

    *allVerses(): Generator<BibleVerse> {
        const self = this;
        for (const book of self._books) {
            for (const chapter of self.books[book].chapters) {
                for (const verse of chapter.verses) {
                    yield verse;
                }
            }
        }
    }
}
let Bible = Searchable(BibleBase);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type Bible = BibleBase & Searchable;

const theBible = new Bible();
export default theBible;

(window as any).Bible = Bible;