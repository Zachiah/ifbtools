import { Theme, createStyles, fade, makeStyles } from '@material-ui/core/styles';
import bible, { BibleVerse } from "util/Bible";
import {
    useEffect,
    useRef,
    useState
} from "react";

import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import InfiniteScroll from 'react-infinite-scroll-component';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import Verse from "components/Verse";

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
            display: 'flex'
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
            width: "100%"
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
        },
        wrapper: {
            display: 'flex',
            height: "100%",
            flexDirection: 'column',
            overflowY: 'auto'
        }
    }),
);


export default function Search({ className }:
    {
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


    const getInitialResults = () => {
        if (!query) return [];

        else {
            const res = []
            for (let i = 0; i <= 10; i++) {
                const val = gen.next();
                if (!val.value) {
                    setHasMore(false);
                    break
                }
                res.push(val.value);
            }
            return res;
        }
    }

    const [results, setResults] = useState<BibleVerse[]>([]);
    const [gen, setGen] = useState(() => bible.search(query, {}));
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        setGen(bible.search(query, {}));
        setHasMore(true)
    }, [query]);

    useEffect(() => {
        setResults(getInitialResults());
    }, [gen]);

    const getNext = () => {
        let newResults: BibleVerse[] = [];
        for (let i = 0; i < 10; i++) {
            const x = gen.next();
            if (x.value) {
                newResults = [...newResults,x.value];
            }
            else {
                setHasMore(false);
                break;
            }
        }
        setResults([...results, ...newResults]);
        
    }

    const scroller = useRef(null);

    return (
        <>
            <IconButton onClick={openDialog} color="inherit" className={className}>
                <SearchIcon />
            </IconButton>

            <Dialog open={open} onClose={closeDialog} classes={{ paper: classes.dialog }} fullWidth>
                <div className={classes.wrapper} ref={scroller}>
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
                        <IconButton>
                            <SettingsIcon />
                        </IconButton>
                    </div>
                    {scroller.current &&
                        <InfiniteScroll dataLength={results.length} next={getNext} hasMore={hasMore} loader={<h4>Loading...</h4>} scrollableTarget={scroller.current}>
                            {results.map(verse => (
                                <Verse verse={verse} active={false} onClick={() => { }} key={verse.id} fullReference />
                            ))}
                        </InfiniteScroll>
                    }
                </div>
            </Dialog>
        </>
    )
}