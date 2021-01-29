import {takeState} from "../App/State";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";

export default () => {

    const {state} = takeState();

    return (
        <div className="app">
            {state.token ? <Dashboard /> : <Login />}
        </div>
    );

};
