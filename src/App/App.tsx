import {Subscription} from "rxjs";
import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useInjectable} from "./Injectables";
import Session from "../Injectables/Session";
import About, {aboutPath} from "../Pages/About";
import Dashboard, {dashboardPath} from "../Pages/Dashboard";
import Error from "../Pages/Error";
import Login, {loginPath} from "../Pages/Login";

const App = () => {

    const session = useInjectable<Session>(Session);

    const [sessionSubscription, setSessionSubscription] = useState<Subscription>();
    const [token, setToken] = useState<string | undefined>(session?.token);

    useEffect(() => {
        setSessionSubscription(session?.tokenObservable?.subscribe(setToken));
    }, [session]);

    useEffect(() => () => {
        sessionSubscription?.unsubscribe();
    }, [sessionSubscription]);

    return (
        <div className="app">
            <div className="box">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to={token ? dashboardPath : loginPath} />
                        </Route>
                        <Route path={dashboardPath}>
                            {!!token ? <Dashboard /> : <Redirect to="/" />}
                        </Route>
                        <Route path={loginPath}>
                            {!token ? <Login /> : <Redirect to="/" />}
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
