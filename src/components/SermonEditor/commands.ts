import { toggleMark, setBlockType } from 'prosemirror-commands'
import { BibleVerse } from 'util/Bible';
import schema from "./schema";

export const toggleMarkStrong = toggleMark(schema.marks.strong);
export const toggleMarkEmphasis = toggleMark(schema.marks.emphasis);
export const setBlockTypeHeading = (level: number) => setBlockType(schema.nodes.heading, { level });
export const setBlockTypeVerse = (verse: BibleVerse) => setBlockType(schema.nodes.verse, { verse });