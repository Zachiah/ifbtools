import bible from "util/Bible";
import { useParams } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton"
import Container from "@material-ui/core/Container";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import { Link } from "react-router-dom";
import Search from "components/Search";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        verse: {
            padding: theme.spacing(2)
        },
        chip: {
            float: "left",
            marginRight: theme.spacing(1)
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
        sidebarPaper: {
            padding: theme.spacing(2)
        },
        title: {
            marginRight: theme.spacing(2)
        },
        navNext: {
            marginRight: "auto"
        }

    }),
);

export default function Chapter() {
    const classes = useStyles();
    const { book, chapter: chapterNumber } = useParams<{ book: string, chapter: string }>();
    const chapter = bible.books[book].getChapter(+chapterNumber);

    return (
        <>
            <Hidden mdUp>
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <IconButton color="inherit" component={Link} to={chapter.prev.link}>
                            <NavigateBefore />
                        </IconButton>
                        <Typography variant="h6" component="h1" color="inherit" className={classes.title} noWrap>
                            {chapter.formattedBook} {chapter._chapter}
                        </Typography>
                        <IconButton className={classes.navNext} color="inherit" component={Link} to={chapter.next.link}>
                            <NavigateNext />
                        </IconButton>
                        <Search />
                    </Toolbar>
                </AppBar>
            </Hidden>

            <Grid container className={classes.gridContainer}>
                <Hidden smDown>
                    <Grid item md={3} className={classes.sidebar}>
                        <Paper className={classes.sidebarPaper}>
                            <TreeView
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                            >
                                {bible._books.map(_book => (
                                    <TreeItem nodeId={_book} label={<Link to={`/bible/${_book}/1`}>{bible.books[_book].formattedBook}</Link>} key={_book}>
                                        {bible.books[_book].chapters.map(chapter => (
                                            <TreeItem nodeId={`${_book}-${chapter._chapter}`} key={chapter._chapter} label={<Link to={`/bible/${chapter._book}/${chapter._chapter}`}>{chapter.formattedBook} {chapter._chapter}</Link>} />
                                        ))}
                                    </TreeItem>
                                ))}
                            </TreeView>
                        </Paper>
                    </Grid>
                </Hidden>

                <Grid item md={9} xs={12} className={classes.mainContent}>
                    <Container maxWidth="sm">
                        <Hidden smDown>
                            <Typography variant="h5" component="h2">{chapter.formattedBook} {chapter._chapter}</Typography>
                        </Hidden>
                        {chapter.verses.map(verse => (
                            <Paper variant="outlined" className={classes.verse} square key={verse._verse}>
                                <Chip label={verse._verse} size="small" className={classes.chip} />
                                <div>
                                    {verse.text}
                                </div>
                            </Paper>
                        ))}
                    </Container>
                </Grid>
            </Grid>

        </>
    )
}