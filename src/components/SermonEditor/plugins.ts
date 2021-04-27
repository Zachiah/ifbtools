import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { history, undo, redo } from 'prosemirror-history';
import {toggleMarkStrong,toggleMarkEmphasis,setBlockTypeHeading} from "./commands";
import rules from "./rules"

export default [
  history(),
  keymap({
    'Mod-z': undo,
    'Shift-Mod-z': redo,
    'Shift-Mod-b': toggleMarkStrong,
    'Shift-Mod-i': toggleMarkEmphasis,
    'Shift-Mod-1': setBlockTypeHeading(1),
    'Shift-Mod-2': setBlockTypeHeading(2),
    'Shift-Mod-3': setBlockTypeHeading(3),
    'Shift-Mod-4': setBlockTypeHeading(4),
    'Shift-Mod-5': setBlockTypeHeading(5),
    'Shift-Mod-6': setBlockTypeHeading(6),
  }),
  keymap(baseKeymap),
  rules()
];