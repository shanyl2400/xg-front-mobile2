import React from 'react';
import { Switch, Route, useHistory } from "react-router-dom";
import Login from './Login';
import Main from './Main';
import Details from './Details';
function MyRouter() {
    let history = useHistory();
    let token = sessionStorage.getItem("token");
    if (token == null) {
        console.log(history);
        history.push("/");
    }
    return (
        <Switch>
            <Route path="/main/:active">
                <Main />
            </Route>
            <Route path="/main">
                <Main />
            </Route>
            <Route path="/details/:id">
                <Details />
            </Route>
            <Route path="/">
                <Login />
            </Route>
        </Switch>
    )
}
export default MyRouter;