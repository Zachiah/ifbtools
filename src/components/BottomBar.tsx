import AppBar from "@material-ui/core/AppBar";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookIcon from "@material-ui/icons/Book";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";

import {Link, useLocation} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bottomNavigationAppBar: {
            top: "auto",
            bottom: theme.spacing(0)
        },
    }),
);

export default function BottomBar() {
    const location = useLocation();
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.bottomNavigationAppBar}>
        <BottomNavigation value={location.pathname.split("/")[1]} showLabels>
            <BottomNavigationAction icon={<BookIcon />} label="Bible" component={Link} to="/bible" value="bible" />
            <BottomNavigationAction icon={<CreateIcon />} label="Sermon" component={Link} to="/sermons" value="sermon" />
        </BottomNavigation>
    </AppBar>
    )
}