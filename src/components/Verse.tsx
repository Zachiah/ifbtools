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
        }
    }),
);

export default function Verse({ verse }: { verse: BibleVerse }) {
    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.verse} square key={verse._verse}>
            <Chip label={verse._verse} size="small" className={classes.chip} />
            <div>
                {verse.text}
            </div>
        </Paper>
    )
}