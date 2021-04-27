import { isMarkActive, isBlockActive } from "@aeaton/prosemirror-commands";
import {
  toggleMarkStrong,
  toggleMarkEmphasis,
  setBlockTypeHeading,
  setBlockTypeVerse,
} from "./commands";
import schema from "./schema";
import { ToolbarGroup } from "@aeaton/react-prosemirror";

import StrongIcon from "@material-ui/icons/FormatBold";
import EmphasisIcon from "@material-ui/icons/FormatItalic";
import H1Icon from "components/icons/H1";
import H2Icon from "components/icons/H2";
import H3Icon from "components/icons/H3";
import H4Icon from "components/icons/H4";
import H5Icon from "components/icons/H5";
import H6Icon from "components/icons/H6";
import { BibleVerse } from "util/Bible";
import { EditorState, Transaction } from "prosemirror-state";

const toolbar = [
  {
    id: "marks",
    items: [
      {
        id: "toggle-strong",
        content: <StrongIcon />,
        action: toggleMarkStrong,
        enable: toggleMarkStrong,
        active: isMarkActive(schema.marks.strong),
      },
      {
        id: "toggle-emphasis",
        title: "Toggle emphasis",
        content: <EmphasisIcon />,
        action: toggleMarkEmphasis,
        enable: toggleMarkEmphasis,
        active: isMarkActive(schema.marks.emphasis),
      },
      {
        id: "set-block-type-h1",
        title: "Set Block Type h1",
        content: <H1Icon />,
        action: setBlockTypeHeading(1),
        enable: setBlockTypeHeading(1),
        active: isBlockActive(schema.nodes.heading, { level: 1 }),
      },
      {
        id: "set-block-type-h2",
        title: "Set Block Type h2",
        content: <H2Icon />,
        action: setBlockTypeHeading(2),
        enable: setBlockTypeHeading(2),
        active: isBlockActive(schema.nodes.heading, { level: 2 }),
      },
      {
        id: "set-block-type-h3",
        title: "Set Block Type h3",
        content: <H3Icon />,
        action: setBlockTypeHeading(3),
        enable: setBlockTypeHeading(3),
        active: isBlockActive(schema.nodes.heading, { level: 3 }),
      },
      {
        id: "set-block-type-h4",
        title: "Set Block Type h4",
        content: <H4Icon />,
        action: setBlockTypeHeading(4),
        enable: setBlockTypeHeading(4),
        active: isBlockActive(schema.nodes.heading, { level: 4 }),
      },
      {
        id: "set-block-type-h5",
        title: "Set Block Type h5",
        content: <H5Icon />,
        action: setBlockTypeHeading(5),
        enable: setBlockTypeHeading(5),
        active: isBlockActive(schema.nodes.heading, { level: 5 }),
      },
      {
        id: "set-block-type-h6",
        title: "Set Block Type h6",
        content: <H6Icon />,
        action: setBlockTypeHeading(6),
        enable: setBlockTypeHeading(6),
        active: isBlockActive(schema.nodes.heading, { level: 6 }),
      },
    ],
  },
];
 
export default toolbar;
