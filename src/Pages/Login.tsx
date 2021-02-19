import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useGlobalState} from "../App/GlobalState";
import Input from "../Elements/Input";

type FormType = {
    login?: string;
    password?: string;
};

export default () => {

    const [state, setState] = useGlobalState();

    const [formValue, setFormValue] = useState<FormType>({});

    const history = useHistory();

    const getFormValueChangeHander = (key: keyof FormType): ((value: string) => void) => {
        return (value: string) => setFormValue({
            ...formValue,
            [key]: value
        });
    };

    const onButtonClick = () => {
        if (formValue.login && formValue.password) {
            setState({
                ...state,
                token: window.crypto.getRandomValues(new Uint32Array(3)).join().replaceAll(",", "")
            });
            setTimeout(() => {
                history.replace("/");
            });
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
                onChange={getFormValueChangeHander("login")} />

            <Input
                label="Password"
                name="password"
                type="password"
                value={formValue.password}
                onChange={getFormValueChangeHander("password")} />

            <div className="is-clearfix mt-6">
                <button
                    className="button is-primary is-pulled-right"
                    onClick={onButtonClick}>
                    Log in
                </button>
            </div>
        </>
    );

};
