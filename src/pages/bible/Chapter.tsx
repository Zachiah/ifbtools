import React, { memo, useEffect, useState } from 'react';
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

export default memo(function Chapter() {
    const classes = useStyles();
    const { book, chapter: chapterNumber } = useParams<{ book: string, chapter: string }>();
    const chapter = bible.books[book].getChapter(+chapterNumber);

    const {
        highlightWholeVerse,
        highlightedText,
        updateHighlights
    } = useHighlights(chapter.verses);

    function highlightSelection(color: string) {
        if (selectedVersesArray.length) {
            selectedVersesArray.map(verse => highlightWholeVerse(verse, color));
            closeSelectedVersesMenu();
        }
        else if (textSelection) {
            Object.entries(textSelection).map(([verseId, charIds]) => {
                console.log(verseId, charIds);
                updateHighlights(BibleVerse.fromId(verseId), Object.fromEntries(charIds.map(item => [item, color])))
            });
            setTextSelection(null);
            document.getSelection()?.empty()
        }

    }
    useEffect(() => {
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("touchend", handleMouseUp);

        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("touchend", handleMouseUp);
        }
    })

    const getEmptySelectedVerses = () => Object.fromEntries(chapter.verses.map(verse => [verse._verse, false]));

    const [selectedVerses, setSelectedVerses] = useState(getEmptySelectedVerses);


    const toggleVerse = (verse: BibleVerse) => {
        setSelectedVerses({ ...selectedVerses, [verse._verse]: !selectedVerses[verse._verse] });
        setTextSelection(null);
        document.getSelection()?.empty();
    }

    const closeSelectedVersesMenu = () => {
        setSelectedVerses(getEmptySelectedVerses());
    }

    const selectedVersesArray = Object.entries(selectedVerses).filter(item => item[1]).map(item => chapter.getVerse(+item[0]));

    const [textSelection, setTextSelection] = useState<null | { [k: string]: number[] }>(null);
    const handleMouseUp = () => {
        const selection = document.getSelection();
        if (!selection) {
            setTextSelection(null)
            return
        }

        const anchorNode = selection.anchorNode?.parentNode as HTMLElement;
        const focusNode = selection.focusNode?.parentNode as HTMLElement;

        if (!anchorNode || !focusNode) {
            setTextSelection(null)
            return
        }

        if (selection.type === "Caret") {
            console.log("No selection");
            setTextSelection(null)
            return
        }

        if (!(anchorNode.dataset.bibleVerseId && focusNode.dataset.bibleVerseId)) {
            console.log(anchorNode.dataset, focusNode.dataset);
            setTextSelection(null)
            return
        }

        /* At this point we have a start and end node that are both verse characters */
        console.log("There is a selection");
        const nodes = Array.from(document.querySelectorAll("[data-bible-verse-id]")) as HTMLElement[];
        const anchorNodeIndex = nodes.indexOf(anchorNode);
        const focusNodeIndex = nodes.indexOf(focusNode);

        let specialNodes;
        console.log(nodes, anchorNodeIndex, focusNodeIndex);
        if (anchorNodeIndex > focusNodeIndex) {
            specialNodes = nodes.slice(focusNodeIndex, anchorNodeIndex + 1);
        } else {
            specialNodes = nodes.slice(anchorNodeIndex, focusNodeIndex + 1);
        }

        const characters = specialNodes.map(node => node.dataset.bibleVerseId as string).map(item => item.split("$"));
        console.log(characters);

        let charactersPartitioned: { [k: string]: number[] } = {};
        for (let character of characters) {
            charactersPartitioned[character[0]] = [...(charactersPartitioned[character[0]] || []), +(character[1])];
        }

        setTextSelection(charactersPartitioned);
        setSelectedVerses(getEmptySelectedVerses());

        // Object.entries(charactersPartitioned).map(([verseId, charIds]) => {
        //     console.log(verseId, charIds);
        //     updateHighlights(BibleVerse.fromId(verseId), Object.fromEntries(charIds.map(item => [item, "yellow"])))
        // })

    }

    return (
        <>
            <Hidden mdUp>
                <ChapterTopBar chapter={chapter} />
            </Hidden>

            <Grid container className={classes.gridContainer} onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp}>
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
                            <Verse key={verse._verse} verse={verse} active={selectedVerses[verse._verse]} onClick={() => toggleVerse(verse)} highlightedText={() => highlightedText(verse)} />
                        ))}
                    </Container>
                </Grid>
            </Grid>
            <HighlightVersesBar open={!!selectedVersesArray.length || !!textSelection} onClose={closeSelectedVersesMenu} onHighlight={highlightSelection} />

        </>
    )
})