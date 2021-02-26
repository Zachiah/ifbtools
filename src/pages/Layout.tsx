import Index from "./Index";
import BibleLayout from "./bible/Layout";
import Hidden from "@material-ui/core/Hidden";
import TopBar from "../components/TopBar";
import { Switch, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import BottomBar from "../components/BottomBar";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import lastPages from "util/LastPages";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(8),
            [theme.breakpoints.up("md")]: {
                marginBottom: theme.spacing(0)
            },
            flexGrow: 1,
            overflow: "auto"
        },
        wrapper: {
            height: "100vh",
            display: "flex",
            flexDirection: "column"
        }
    }),
);

export default function Layout() {
    const styles = useStyles();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/bible')) {
            lastPages.bible = location.pathname;
        }
    })



    return (
        <div className={styles.wrapper}>
            <TopBar title="IFB Tools" items={[{ url: "/bible", display: "Bible" }]} />


            <main className={styles.main}>
                <Switch>
                    <Route path="/bible">
                        <BibleLayout />
                    </Route>

                    <Route exact path="/">
                        <Index />
                    </Route>
                </Switch>
            </main>

            <Hidden mdUp>
                <BottomBar />
            </Hidden>
        </div>
    )
}