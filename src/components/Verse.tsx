import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { memo, useEffect } from "react";

import { BibleVerse } from "util/Bible";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        verse: {
            padding: theme.spacing(2)
        },
        chip: {
            float: "left",
            marginRight: theme.spacing(1)
        },
        button: {
            border: "1px solid transparent",
            padding: "0px",
            margin: "0px",
            display: "block",
            fontSize: "inherit",
            width: "100%",
            cursor: "pointer",
            userSelect: "text"
        },
        active: {
            border: "1px solid black"
        }
    }),
);

export default memo(function Verse({ verse, active, onClick, highlightedText }: {
    verse: BibleVerse, active: boolean, onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any, highlightedText: () => {
        char: string;
        highlight: string;
    }[]
}) {
    const classes = useStyles();

    return (
        <Paper variant="outlined" className={`${classes.verse}${active ? " " + classes.active : ""}`} square key={verse._verse}>
            <Chip label={verse._verse} size="small" className={classes.chip} onClick={onClick} component="button" />
            <div>
                {highlightedText().map((item, id) => (
                    <span key={id} style={{ backgroundColor: item.highlight }} {...{ "data-bible-verse-id": `${verse.id}$${id}` }}>{item.char}</span>
                ))}
            </div>
        </Paper>
    )
})