import {Subscription} from "rxjs";
import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {useInjectable} from "./Injectables";
import Session from "../Services/SessionService";
import AboutPage, {aboutPagePath} from "../Pages/AboutPage";
import DashboardPage, {dashboardPagePath} from "../Pages/DashboardPage";
import ErrorPage from "../Pages/ErrorPage";
import LoginPage, {loginPagePath} from "../Pages/LoginPage";

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
                            <Redirect to={token ? dashboardPagePath : loginPagePath} />
                        </Route>
                        <Route path={dashboardPagePath}>
                            {!!token ? <DashboardPage /> : <Redirect to="/" />}
                        </Route>
                        <Route path={loginPagePath}>
                            {!token ? <LoginPage /> : <Redirect to="/" />}
                        </Route>
                        <Route path={aboutPagePath}>
                            <AboutPage />
                        </Route>
                        <Route path="*">
                            <ErrorPage />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );

};

export default App;
