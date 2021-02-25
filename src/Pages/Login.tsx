import {useState} from "react";
import {Link} from "react-router-dom";
import {useInjectable} from "../App/Injectables";
import SessionService from "../Services/SessionService";
import Input from "../Elements/Input";
import {aboutPath} from "./About";

type FormType = {
    login?: string;
    password?: string;
};

export const loginPath = "/login";

const Login = () => {

    const sessionService = useInjectable<SessionService>(SessionService);

    const [formValue, setFormValue] = useState<FormType>({});

    const getFormValueChangeHandler = (key: keyof FormType): ((value: string) => void) => {
        return (value: string) => setFormValue({
            ...formValue,
            [key]: value
        });
    };

    const onButtonClickHandler = () => {
        if (formValue.login && formValue.password) {
            sessionService?.logIn("token_string_value");
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
