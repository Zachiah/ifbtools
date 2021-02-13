import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Index from "./Index";
import BibleLayout from "./bible/Layout";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        mainPaper: {
            margin: theme.spacing(2)
        }
    }),
);

export default function Layout() {
    const classes = useStyles();
    return (
        <>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="h1" color="inherit">
                        IFB Tools
                    </Typography>
                </Toolbar>
            </AppBar>

            <Paper className={classes.mainPaper} elevation={0}>
                <Switch>
                    <Route path="/bible">
                        <BibleLayout />
                    </Route>

                    <Route exact path="/">
                        <Index />
                    </Route>


                </Switch>
            </Paper>
        </>
    )
}