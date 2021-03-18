import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from "@material-ui/core/AppBar";
import { BibleVerse } from "util/Bible";
import Chip from "@material-ui/core/Chip"
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import { memo } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        highlightChip: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            border: "1px solid black"
        },
        closeIcon: {
            marginLeft: "auto"
        }
    }),
);

export default memo(function HighlightVersesBar({ open, onClose, onHighlight }: { open: boolean, onClose: () => any, onHighlight: (color: string) => any }) {

    const classes = useStyles();

    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "brown", "#CCC", "transparent"];
    return (
        (open) ?
            <AppBar position="fixed" color="inherit">
                <Toolbar variant="dense">
                    {colors.map(color => (
                        <Chip key={color} style={{ backgroundColor: color }} component="button" onClick={() => onHighlight(color)} className={classes.highlightChip} />
                    ))}
                    <IconButton onClick={() => onClose()} className={classes.closeIcon}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar> : <></>
    )
});