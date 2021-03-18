import { Route, Switch, useLocation } from "react-router-dom";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { memo, useEffect } from "react";

import BibleLayout from "./bible/Layout";
import BottomBar from "../components/BottomBar";
import Hidden from "@material-ui/core/Hidden";
import Index from "./Index";
import TopBar from "../components/TopBar";
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

export default memo(function Layout() {
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
})