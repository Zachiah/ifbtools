import Sermon from "util/Sermon";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Popover from "@material-ui/core/Popover";
import { Link } from "react-router-dom";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {MouseEvent, MouseEventHandler, useState,memo} from "react";
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import {deleteSermon} from "state/useSermons";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: '6em',
            right: '2em'
        },
        listItem: {
            color: 'inherit',
        }
    }),
);

export default memo(function SermonListItem({ sermon }: { sermon: Sermon }) {
    const [anchorEl,setAnchorEl] = useState<null|HTMLButtonElement>(null);
    const styles = useStyles();

    const handleClose = () => {
        setAnchorEl(null);
    }

    const openPopover = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }

    const popoverOpen = !!anchorEl;
    return (
        <ListItem key={sermon.id} className={styles.listItem}>
            <ListItemText>{sermon.title}</ListItemText>

            <IconButton component={Link} to={`/sermons/${sermon.id}`}>
                <CreateIcon />
            </IconButton>

            <IconButton onClick={openPopover}>
                <MoreVertIcon />
            </IconButton>

            <Popover
                id={`popover-list-item-${sermon.id}`}
                open={popoverOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List>
                    <ListItem button onClick={() => {setAnchorEl(null);deleteSermon(sermon)}}>
                        <ListItemIcon><TrashIcon /></ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </ListItem>
                </List>
            </Popover>
        </ListItem>
    )
});