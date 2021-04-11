import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { memo, useState } from "react";

import AdjacentChapterButton from "components/AdjacentChapterButton";
import AppBar from "@material-ui/core/AppBar";
import { BibleChapter } from "util/Bible";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Search from "components/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Sermon from "util/Sermon";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        split: {
            marginLeft: "auto"
        }
    }),
);


export default memo(function SermonTopBar({ sermon,hasChanges, valid, onSave }: { sermon: Sermon,hasChanges: boolean,onSave: () => any, valid: boolean }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const closeDialog = () => setDialogOpen(false);
    const openDialog = () => setDialogOpen(true);
    const classes = useStyles();
    return (
        <>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <IconButton color="inherit" component={Link} to="/sermons">
                        <ArrowBackIcon />
                    </IconButton>

                    <Typography variant="h6">
                        Editing - {sermon.title}
                    </Typography>

                    <span className={classes.split}></span>

                    <Search />

                    <IconButton color="inherit" disabled={!hasChanges || !valid} onClick={onSave}>
                        <CheckIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
})