import {Subscription} from "rxjs";
import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useInjectable} from "./Injectables";
import {Storage} from "../Injectables/Storage";
import About, {aboutPath} from "../Pages/About";
import Dashboard, {dashboardPath} from "../Pages/Dashboard";
import Error from "../Pages/Error";
import Login, {loginPath} from "../Pages/Login";

const App = () => {

    const storage = useInjectable<Storage>(Storage);

    const [token, setToken] = useState<string>(storage?.get("token"));
    const [tokenSubscription, setTokenSubscription] = useState<Subscription>();

    useEffect(() => {
        setTokenSubscription(storage?.getObservable("token").subscribe(setToken));
    }, [storage]);

    useEffect(() => () => {
        tokenSubscription?.unsubscribe();
    }, [tokenSubscription]);

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
