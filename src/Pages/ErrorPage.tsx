import {Link} from "react-router-dom";

const Error = () => (
    <>
        <h1 className="title">Error 404</h1>
        <h6 className="subtitle is-6">Page not found</h6>
        <div className="actions is-clearfix">
            <Link className="button is-primary is-outlined is-pulled-left" to="/">
                Back
            </Link>
        </div>
    </>
);

export default Error;
