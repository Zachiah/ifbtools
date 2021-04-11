import Index from "./Index";
import {
    Switch,
    Route,
} from "react-router-dom";
import Sermon from "./Sermon";


export default function Layout() {
    return (
        <>
            <Switch>
                <Route exact path="/sermons">
                    <Index />
                </Route>

                <Route exact path ="/sermons/:id">
                    <Sermon />
                </Route>
            </Switch>
        </>
    )
}