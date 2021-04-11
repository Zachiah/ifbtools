import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useSermons, createSermon } from "state/useSermons";
import { Link } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SermonListItem from "components/SermonListItem";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { useState } from "react";
import SermonTitleEditor from "components/SermonTitleEditor";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: '6em',
            right: '2em'
        },
        listItem: {
            color: 'inherit',
        },
        noSermons: {
            padding: theme.spacing(2)
        }
    }),
);

export default function Index() {
    const styles = useStyles();
    const [sermons, setSermons] = useSermons();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newSermonTitle, setNewSermonTitle] = useState("");
    const [sermonTitleChange, setSermonTitleChange] = useState(false);
    const history = useHistory();

    const openDialog = () => {
        setDialogOpen(true);
        setSermonTitleChange(false);
        setNewSermonTitle("");
    }
    const closeDialog = () => setDialogOpen(false);

    const handleCreateSermonClick = () => {
        const s = createSermon({title: newSermonTitle});
        history.push(`/sermons/${s.id}`);
    }

    const handleTitleChange = (v: string) => {
        setNewSermonTitle(v);
        v && setSermonTitleChange(true);
    }

    console.log(sermonTitleChange)

    return (
        <>
            {!sermons.length && <Typography className={styles.noSermons} variant="h6">Use the plus to create your first sermon</Typography>}
            <List>
                {sermons.map(sermon => (
                    <SermonListItem sermon={sermon} key={sermon.id}/>

                ))}
            </List>
            <Fab className={styles.fab} color="primary" onClick={openDialog}>
                <AddIcon />
            </Fab>

            <Dialog open={dialogOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create New Sermon</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please type a Sermon title. (this can always be changed later) 
                    </DialogContentText>

                    <SermonTitleEditor value={newSermonTitle} onChange={handleTitleChange} valid={!!newSermonTitle || !sermonTitleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Cancel
                    </Button>

                    <Button onClick={handleCreateSermonClick} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}