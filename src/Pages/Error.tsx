import {Link} from "react-router-dom";

export default () => {

    return (
        <>
            <h1 className="title">Error 404</h1>
            <h6 className="subtitle is-6">Page not found</h6>
            <Link to="/">
                Back
            </Link>
        </>
    );

};
