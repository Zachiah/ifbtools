import Index from "./Index";
import Chapter from "./Chapter";
import bible from "../../util/Bible";
import {
    Switch,
    Route,
} from "react-router-dom";


export default function Layout() {
    return (
        <>
            <Switch>
                <Route exact path="/bible">
                    <Index />
                </Route>

                <Route exact path={String.raw`/bible/:book(${bible._books.join('|')})/:chapter(\d+)`}>
                    <Chapter />
                </Route>
            </Switch>
        </>
    )
}