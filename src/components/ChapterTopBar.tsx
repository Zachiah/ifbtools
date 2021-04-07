import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { memo, useState } from "react";

import AdjacentChapterButton from "components/AdjacentChapterButton";
import AppBar from "@material-ui/core/AppBar";
import { BibleChapter } from "util/Bible";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Search from "components/Search";
import SelectChapterDialog from "components/SelectChapterDialog";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chapterTitle: {
            display: "inline-block",
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2)
        },
        search: {
            marginLeft: "auto"
        }
    }),
);


export default memo(function ChapterTopBar({ chapter }: { chapter: BibleChapter }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const closeDialog = () => setDialogOpen(false);
    const openDialog = () => setDialogOpen(true);
    const classes = useStyles();
    return (
        <>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <AdjacentChapterButton chapter={chapter} to="previous" />
                    <Button color="inherit" className={classes.chapterTitle} onClick={openDialog}>
                        <Typography variant="h6" component="h1" color="inherit" noWrap>
                            <Hidden smUp>
                                {chapter.bookShortName} {chapter._chapter}
                            </Hidden>
                            <Hidden xsDown>
                                {chapter.formattedBook} {chapter._chapter}
                            </Hidden>
                        </Typography>
                    </Button>
                    <AdjacentChapterButton chapter={chapter} to="next" />
                    <Search className={classes.search} />
                </Toolbar>
            </AppBar>

            <SelectChapterDialog open={dialogOpen} onClose={closeDialog} />
        </>
    );
})