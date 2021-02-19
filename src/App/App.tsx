import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useGlobalState} from "./GlobalState";
import About, {aboutPath} from "../Pages/About";
import Dashboard, {dashboardPath} from "../Pages/Dashboard";
import Error from "../Pages/Error";
import Login, {loginPath} from "../Pages/Login";

const App = () => {

    const [state] = useGlobalState();

    return (
        <div className="app">
            <div className="box">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to={state.token ? dashboardPath : loginPath} />
                        </Route>
                        <Route path={dashboardPath}>
                            {!!state.token ? <Dashboard /> : <Redirect to="/" />}
                        </Route>
                        <Route path={loginPath}>
                            {!state.token ? <Login /> : <Redirect to="/" />}
                        </Route>
                        <Route path={aboutPath}>
                            <About />
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

export default App;
