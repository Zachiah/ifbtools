import Index from "./Index";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default function Layout() {
    return (
        <>
            <Switch>
                <Route exact path="/bible">
                    <Index />
                </Route>
            </Switch>
        </>
    )
}