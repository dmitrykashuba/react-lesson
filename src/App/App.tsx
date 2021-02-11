import {useGlobalState} from "./GlobalState";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";

export default () => {

    const {state} = useGlobalState();

    return (
        <div className="app">
            <div className="box">
                {state.token ? <Dashboard /> : <Login />}
            </div>
        </div>
    );

};
