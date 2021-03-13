import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom"
import MenuIcon from "@material-ui/icons/Menu";
import Search from "../components/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

function Results({ query }: { query: string }) {
    return (<p>Sorry I ain't working yet</p>)
}

export default function TopBar({ title,items }: { title: string,items?: {url: string, display: string}[] }) {
    const classes = useStyles();
    return (
        <AppBar position="fixed">
            <Toolbar variant="dense">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="h1" color="inherit" className={classes.title} noWrap>
                    {title}
                </Typography>
                {items && items.map(item => (
                    <Button key={item.url} component={Link} to={item.url} color="inherit">{item.display}</Button>
                ))}
                <Search Results={Results}/>
            </Toolbar>
        </AppBar>
    )
}