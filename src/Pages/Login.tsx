import {useState} from "react";
import {Link} from "react-router-dom";
import {useInjectable} from "../App/Injectables";
import Session from "../Injectables/Session";
import Input from "../Elements/Input";
import {aboutPath} from "../Pages/About";

type FormType = {
    login?: string;
    password?: string;
};

const loginPath = "/login";

const Login = () => {

    const session = useInjectable<Session>(Session);

    const [formValue, setFormValue] = useState<FormType>({});

    const getFormValueChangeHandler = (key: keyof FormType): ((value: string) => void) => {
        return (value: string) => setFormValue({
            ...formValue,
            [key]: value
        });
    };

    const onButtonClickHandler = () => {
        if (formValue.login && formValue.password) {
            session?.logIn(window.crypto.getRandomValues(new Uint32Array(3)).join().replaceAll(",", ""));
        }
    };

    return (
        <>
            <h1 className="title">Log in</h1>
            <h6 className="subtitle is-6">Enter your credentials</h6>

            <Input
                label="Login"
                name="login"
                value={formValue.login}
                onChange={getFormValueChangeHandler("login")} />

            <Input
                label="Password"
                name="password"
                type="password"
                value={formValue.password}
                onChange={getFormValueChangeHandler("password")} />

            <div className="actions is-clearfix">
                <Link
                    className="button is-primary is-outlined is-pulled-left"
                    to={aboutPath}>
                    About
                </Link>
                <button
                    className="button is-primary is-pulled-right"
                    onClick={onButtonClickHandler}>
                    Log in
                </button>
            </div>
        </>
    );

};

export default Login;

export {loginPath};
