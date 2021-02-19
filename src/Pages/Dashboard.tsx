import {Link} from "react-router-dom";
import {useInjectable} from "../App/Injectables";
import Session from "../Injectables/Session";
import {aboutPath} from "../Pages/About";

const dashboardPath = "/dashboard";

const Dashboard = () => {

    const session = useInjectable<Session>(Session);

    const onButtonClickHandler = () => {
        session?.logOut();
    };

    return (
        <>
            <h1 className="title">Dashboard</h1>
            <h6 className="subtitle is-6">This is user dashboard</h6>
            <span className="tag is-primary"><b style={{paddingRight: 10}}>Token:</b>{session?.token}</span>

            <div className="actions is-clearfix">
                <Link
                    className="button is-primary is-outlined is-pulled-left"
                    to={aboutPath}>
                    About
                </Link>
                <button
                    className="button is-primary is-pulled-right"
                    onClick={onButtonClickHandler}>
                    Log out
                </button>
            </div>
        </>
    );

};

export default Dashboard;

export {dashboardPath};
