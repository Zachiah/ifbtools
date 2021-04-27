import {
    inputRules,
    textblockTypeInputRule
} from "prosemirror-inputrules";
import schema from "./schema";
import {Plugin} from "prosemirror-state";
import theBible from "util/Bible";

export default ():Plugin => 
    inputRules({
        rules: [
            textblockTypeInputRule(
                /\{([a-z]+) (\d+):(\d+)\}/,
                schema.nodes.verse,
                (match) => ({verse: theBible.books[match[1]].getChapter(+match[2]).getVerse(+match[3])})
            )
        ]
    })