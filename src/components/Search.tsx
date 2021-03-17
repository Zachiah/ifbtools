import { Theme, createStyles, fade, makeStyles } from '@material-ui/core/styles';

import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import {
    useState
} from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '20ch',
            },
            backgroundColor: "inherit",
            border: "0px solid black",
            color: 'inherit',
            fontSize: "1em"
        },
        dialog: {
            height: "100%"
        }
    }),
);

export default function Search({ Results, className }:
    {
        Results: ({ query }: { query: string, },) => JSX.Element,
        className?: string
    }) {
    const classes = useStyles();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuery(e.target.value);
    }

    const closeDialog = () => {
        console.log("closing Dialog");
        setOpen(false);
    }
    const openDialog = () => {
        setOpen(true);
    }

    return (
        <>
            <IconButton onClick={openDialog} color="inherit" className={className}>
                <SearchIcon />
            </IconButton>

            <Dialog open={open} onClose={closeDialog} className={classes.dialog} fullWidth>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleChange}
                        value={query}
                    />
                </div>
                <Results query={query} />
            </Dialog>
        </>
    )
}