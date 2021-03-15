import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton"
import { Link } from "react-router-dom";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import NavigateNext from "@material-ui/icons/NavigateNext";
import Paper from "@material-ui/core/Paper";
import Search from "components/Search";
import SelectChapterDialog from "components/SelectChapterDialog"
import SelectChapterSidebar from "components/SelectChapterSidebar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography"
import Verse from "components/Verse";
import bible from "util/Bible";
import { useParams } from "react-router-dom";
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        verse: {
            padding: theme.spacing(2)
        },
        sidebar: {
            height: "100%",
            overflow: "auto"
        },
        gridContainer: {
            height: "100%"
        },
        mainContent: {
            height: "100%",
            overflow: "auto"
        },
        title: {
            marginRight: theme.spacing(2)
        },
        navNext: {
            marginRight: "auto",
            display: "inline-block",
            marginBottom: theme.spacing(1)
        },
        navPrev: {
            display: "inline-block",
            marginBottom: theme.spacing(1)
        },
        chapterTitle: {
            display: "inline-block",
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2)
        }

    }),
);
function Results({ query }: { query: string }) {
    return (
        <>{query}</>
    )
}

export default function Chapter() {
    const classes = useStyles();
    const { book, chapter: chapterNumber } = useParams<{ book: string, chapter: string }>();
    const chapter = bible.books[book].getChapter(+chapterNumber);

    const [dialogOpen, setDialogOpen] = useState(false);
    const closeDialog = () => setDialogOpen(false);
    const openDialog = () => setDialogOpen(true);


    const prevButton = (
        <IconButton color="inherit" component={Link} to={chapter.prev.link} className={classes.navPrev}>
            <NavigateBefore />
        </IconButton>
    );

    const nextButton = (
        <IconButton className={classes.navNext} color="inherit" component={Link} to={chapter.next.link}>
            <NavigateNext />
        </IconButton>
    )
    return (
        <>
            <Hidden mdUp>
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        {prevButton}
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
                        {nextButton}
                        <Search Results={Results} />
                    </Toolbar>
                </AppBar>

                <SelectChapterDialog open={dialogOpen} onClose={closeDialog} />
            </Hidden>

            <Grid container className={classes.gridContainer}>
                <Hidden smDown>
                    <Grid item md={3} className={classes.sidebar}>
                        <SelectChapterSidebar />
                    </Grid>
                </Hidden>

                <Grid item md={9} xs={12} className={classes.mainContent}>
                    <Container maxWidth="sm">
                        <Hidden smDown>
                            <Paper variant="outlined" className={classes.verse} square>
                                {prevButton}
                                <Typography variant="h5" component="h2" className={classes.chapterTitle}>{chapter.formattedBook} {chapter._chapter}</Typography>
                                {nextButton}
                            </Paper>
                        </Hidden>
                        {chapter.verses.map(verse => (
                            <Verse verse={verse} />
                        ))}
                    </Container>
                </Grid>
            </Grid>

        </>
    )
}