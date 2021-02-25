import {Link} from "react-router-dom";
import {useInjectable} from "../App/Injectables";
import SessionService from "../Services/SessionService";
import {aboutPath} from "./About";

export const dashboardPath = "/dashboard";

const Dashboard = () => {

    const sessionService = useInjectable<SessionService>(SessionService);

    const onButtonClickHandler = () => {
        sessionService?.logOut();
    };

    return (
        <>
            <h1 className="title">Dashboard</h1>
            <h6 className="subtitle is-6">This is user dashboard</h6>
            <span className="tag is-primary"><b style={{paddingRight: 10}}>Token:</b>{sessionService?.token}</span>

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
