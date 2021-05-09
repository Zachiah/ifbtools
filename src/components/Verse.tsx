import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { memo, useEffect } from "react";

import { BibleVerse } from "util/Bible";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    verse: {
      padding: theme.spacing(2),
    },
    chip: {
      float: "left",
      marginRight: theme.spacing(1),
    },
    button: {
      border: "1px solid transparent",
      padding: "0px",
      margin: "0px",
      display: "block",
      fontSize: "inherit",
      width: "100%",
      cursor: "pointer",
      userSelect: "text",
    },
    active: {
      border: "1px solid black",
    },
    link: {
        color: "currentColor",
        textDecoration: "inherit",
    }
  })
);

export default memo(function Verse({
  verse,
  active,
  onClick,
  highlightedText,
  fullReference,
  disableLink,
}: {
  verse: BibleVerse;
  active: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any;
  highlightedText?: () => {
    char: string;
    highlight: string;
  }[];
  fullReference?: boolean;
  disableLink?: boolean;
}) {
  const classes = useStyles();

  const theVerse = (
    <Paper
      variant="outlined"
      className={`${classes.verse}${active ? " " + classes.active : ""}`}
      square
      key={verse._verse}
      id={"bible-verse-" + verse.id}
    >
      <Chip
        label={fullReference ? verse.formattedReference : verse._verse}
        size="small"
        className={classes.chip}
        onClick={onClick}
        component="button"
      />
      <div>
        {highlightedText &&
          highlightedText().map((item, id) => (
            <span
              key={id}
              style={{ backgroundColor: item.highlight }}
              {...{ "data-bible-verse-id": `${verse.id}$${id}` }}
            >
              {item.char}
            </span>
          ))}
        {!highlightedText && verse.text}
      </div>
    </Paper>
  );

  return disableLink ? theVerse : (
    <Link
      to={`/bible/${verse._book}/${verse._chapter}#bible-verse-${verse.id}`}
      className={classes.link}
    >{theVerse}</Link>
  );
});
