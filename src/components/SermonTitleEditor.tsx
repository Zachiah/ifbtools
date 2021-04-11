import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {memo} from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            marginBottom: theme.spacing(2)
        },
        wrapper: {
            padding: theme.spacing(2)
        }
    }),
);

export default memo(function SermonTitleEditor({value,onChange,valid}: {value: string, onChange: (newV: string) => void, valid: boolean}) {
    const classes = useStyles();
    return (
        <FormControl fullWidth className={classes.title}>
            <TextField
                autoFocus
                variant="outlined"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                label="Title"
                error={!valid}
                helperText={(!valid ? "Title Can't be blank" : null)}
            />
        </FormControl>
    )
});