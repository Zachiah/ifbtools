import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { BibleVerse } from "util/Bible";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        verse: {
            padding: theme.spacing(2)
        },
        chip: {
            float: "left",
            marginRight: theme.spacing(1)
        },
        button: {
            border: "0px solid black",
            padding: "0px",
            margin: "0px",
            display: "block",
            fontSize: "inherit",
            width: "100%"
        }
    }),
);

export default function Verse({ verse }: { verse: BibleVerse }) {
    const classes = useStyles();
    return (
        <button className={classes.button}>
            <Paper variant="outlined" className={classes.verse} square key={verse._verse}>
                <Chip label={verse._verse} size="small" className={classes.chip} />
                <div>
                    {verse.text}
                </div>
            </Paper>
        </button>
    )
}