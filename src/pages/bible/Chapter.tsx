import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import bible, { BibleVerse } from "util/Bible";

import AdjacentChapterButton from "components/AdjacentChapterButton";
import ChapterTopBar from "components/ChapterTopBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import HighlightVersesBar from 'components/HighlightVersesBar';
import Paper from "@material-ui/core/Paper";
import SelectChapterSidebar from "components/SelectChapterSidebar";
import Typography from "@material-ui/core/Typography"
import Verse from "components/Verse";
import { useHighlights } from 'state/useHighlights';
import { useParams } from "react-router-dom";

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
        titleWrapper: {
            paddingBottom: theme.spacing(2)
        },
        chapterTitle: {
            display: "inline-block"
        }

    }),
);

export default function Chapter() {
    const classes = useStyles();
    const { book, chapter: chapterNumber } = useParams<{ book: string, chapter: string }>();
    const chapter = bible.books[book].getChapter(+chapterNumber);

    const {
        highlightWholeVerse
    } = useHighlights(chapter.verses);

    function highlightSelectedVerses(color: string) {
        selectedVersesArray.map(verse => highlightWholeVerse(verse, color));
        closeSelectedVersesMenu();
    }

    const getEmptySelectedVerses = () => Object.fromEntries(chapter.verses.map(verse => [verse._verse, false]));

    const [selectedVerses, setSelectedVerses] = useState(getEmptySelectedVerses);


    const toggleVerse = (verse: BibleVerse) => {
        setSelectedVerses({ ...selectedVerses, [verse._verse]: !selectedVerses[verse._verse] })
    }

    const closeSelectedVersesMenu = () => {
        setSelectedVerses(getEmptySelectedVerses());
    }

    const selectedVersesArray = Object.entries(selectedVerses).filter(item => item[1]).map(item => chapter.getVerse(+item[0]));

    return (
        <>
            <Hidden mdUp>
                <ChapterTopBar chapter={chapter} />
            </Hidden>

            <Grid container className={classes.gridContainer}>
                <Hidden smDown>
                    <Grid item md={3} className={classes.sidebar}>
                        <SelectChapterSidebar />
                    </Grid>
                </Hidden>

                <Grid item md={9} xs={12} className={classes.mainContent}>
                    <Container maxWidth="sm">
                        <div className={classes.titleWrapper}>
                            <Hidden smDown>
                                <Paper variant="outlined" className={classes.verse} square>
                                    <AdjacentChapterButton chapter={chapter} to="previous" />
                                    <Typography variant="h5" component="h2" className={classes.chapterTitle}>{chapter.formattedBook} {chapter._chapter}</Typography>
                                    <AdjacentChapterButton chapter={chapter} to="next" />
                                </Paper>
                            </Hidden>
                        </div>
                        {chapter.verses.map(verse => (
                            <Verse key={verse._verse} verse={verse} active={selectedVerses[verse._verse]} onClick={() => toggleVerse(verse)} />
                        ))}
                    </Container>
                </Grid>
            </Grid>
            <HighlightVersesBar selectedVerses={selectedVersesArray} onClose={closeSelectedVersesMenu} onHighlight={highlightSelectedVerses} />

        </>
    )
}