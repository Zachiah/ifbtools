import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import bible from "util/Bible";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sidebarPaper: {
            padding: theme.spacing(2)
        },

    }),
);

export default function SelectChapterSidebar() {
    const classes = useStyles();

    return (
        <Paper className={classes.sidebarPaper}>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {bible._books.map(_book => (
                    <TreeItem nodeId={_book} label={<Link to={bible.books[_book].getChapter(1).link}>{bible.books[_book].formattedBook}</Link>} key={_book}>
                        {bible.books[_book].chapters.map(chapter => (
                            <TreeItem nodeId={`${_book}-${chapter._chapter}`} key={chapter._chapter} label={<Link to={chapter.link}>{chapter.formattedBook} {chapter._chapter}</Link>} />
                        ))}
                    </TreeItem>
                ))}
            </TreeView>
        </Paper>
    )
}