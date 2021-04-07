import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { memo, useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import { BibleVerse } from "util/Bible";
import Chip from "@material-ui/core/Chip"
import CloseIcon from "@material-ui/icons/Close";
import CopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        highlightChip: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            border: "1px solid black"
        },
        closeIcon: {
            marginLeft: "auto"
        },
        colorsWrapper: {
            display: "flex",
            overflow: "auto",
            margin: "0px 3px",
            padding: "2px",
            boxShadow: "0 0 4px black",

            "&::-webkit-scrollbar": {
                height: "4px"
            },
            "&::-webkit-scrollbar-thumb": {
                background: "grey",
            }
        }
    }),
);

export default memo(function HighlightVersesBar({ open, onClose, onHighlight, onCopy }:
    {
        open: boolean,
        onClose: () => any,
        onHighlight: (color: string) => any,
        onCopy: () => any
    }) {

    const classes = useStyles();

    const handleHighlight = (color: string) => {
        onHighlight(color)
    }

    const colors = [
        "aliceblue",
        "aquamarine",
        "blanchedalmond",
        "burlywood",
        "blue",
        "brown",
        "blueviolet",
        "chocolate",
        "firebrick",
        "fuscia",
        "floralwhite",
        "forestgreen",
        "greenyellow",
        "goldenrod",
        "green",
        "indigo",
        "orange",
        "olivedrab",
        "olive",
        "orangered",
        "orchid",
        "palegoldenrod",
        "palegreen",
        "paleturquoise",
        "palevioletred",
        "papayawhip",
        "peachpuff",
        "peru",
        "pink",
        "plum",
        "powderblue",
        "purple",
        "royalblue",
        "red",
        "rebeccapurple",
        "turquoise",
        "transparent",
        "violet",
        "wheat",
        "yellow",
        "#777", "#999", "#BBB", "#CCC", "#EEE"
    ];
    return (
        (open) ?
            <AppBar position="fixed" color="inherit">
                <Toolbar variant="dense">
                    <IconButton onClick={onCopy}>
                        <CopyIcon />
                    </IconButton>
                    <div className={classes.colorsWrapper}>
                        {colors.map(color => (
                            <Chip key={color} style={{ backgroundColor: color }} component="button" onClick={() => handleHighlight(color)} className={classes.highlightChip} />
                        ))}
                    </div>
                    <IconButton onClick={() => onClose()} className={classes.closeIcon}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar> : <></>
    )
});