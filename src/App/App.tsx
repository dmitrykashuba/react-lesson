import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useGlobalState} from "./GlobalState";
import Dashboard from "../Pages/Dashboard";
import Error from "../Pages/Error";
import Login from "../Pages/Login";

export default () => {

    const [protectedPath, publicPath] = ["/dashboard", "/login"];

    const [state] = useGlobalState();

    return (
        <div className="app">
            <div className="box">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to={state.token ? protectedPath : publicPath} />
                        </Route>
                        <Route path={protectedPath}>
                            {!!state.token
                                ? <Dashboard />
                                : <Redirect to="/" />
                            }
                        </Route>
                        <Route path={publicPath}>
                            <Login />
                        </Route>
                        <Route path="*">
                            <Error />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );

};
