import {useState} from "react";
import {takeState} from "../App/State";
import Input from "../Elements/Input";

export default () => {

    const {state, setState} = takeState();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const onLoginValueChange = (value: string) => {
        setLogin(value);
    };

    const onPasswordValueChange = (value: string) => {
        setPassword(value);
    };

    const onButtonClick = () => {
        if (login && password) {
            const token = `${login}${password}`;
            setState({...state, token});
        }
    };

    return (
        <div className="box">

            <h1 className="title">Log in</h1>
            <h6 className="subtitle is-6">Enter your credentials</h6>

            <Input
                label="Login"
                value={login}
                onChange={onLoginValueChange} />

            <Input
                label="Password"
                type="password"
                value={password}
                onChange={onPasswordValueChange} />

            <div className="is-clearfix mt-6">
                <button
                    className="button is-primary is-pulled-right"
                    onClick={onButtonClick}>
                    Log in
          </button>
            </div>

        </div>
    );

};
