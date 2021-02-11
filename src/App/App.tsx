import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useGlobalState} from "./GlobalState";
import Dashboard from "../Pages/Dashboard";
import Error from "../Pages/Error";
import Login from "../Pages/Login";

export default () => {

    const [state] = useGlobalState();

    return (
        <div className="app">
            <div className="box">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to={state.token ? "/dashboard" : "/login"} />
                        </Route>
                        <Route path="/dashboard" render={() =>
                            !!state.token
                                ? <Dashboard />
                                : <Redirect to="/" />
                        } />
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route component={Error}>
                            <Error />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );

};
