import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { BibleChapter } from "util/Bible";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            display: "inline-block",
            marginBottom: theme.spacing(1)
        },
    }),
);

export default function AdjacentChapterButton({ chapter, to }: { chapter: BibleChapter, to: "next" | "previous" }) {
    const classes = useStyles();

    return (
        <IconButton color="inherit" component={Link} to={to === "next" ? chapter.next.link : chapter.prev.link} className={classes.button}>
            {to === "previous" && <NavigateBeforeIcon />}
            {to === "next" && <NavigateNextIcon />}
        </IconButton>
    )
}