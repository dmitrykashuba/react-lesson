import {Link} from "react-router-dom";

const aboutPath = "/about";

const About = () => (
    <>
        <h1 className="title">About</h1>
        <h6 className="subtitle is-6">This is simple about page</h6>
        <div className="actions is-clearfix">
            <Link className="button is-primary is-outlined is-pulled-left" to="/">
                Back
            </Link>
        </div>
    </>
);

export default About;

export {aboutPath};
