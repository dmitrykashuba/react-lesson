import {useState, useEffect, ChangeEvent} from "react";

type Props = {
    label?: string;
    name: string;
    type?: "text" | "password";
    value?: string;
    onChange?: (value: string) => void;
};

export default ({label, name, type, value, onChange}: Props) => {

    const [inputLabel, setInputLabel] = useState(label || "");
    const [inputName, setInputName] = useState(name);
    const [inputType, setInputType] = useState(type || "");
    const [inputValue, setInputValue] = useState(value || "");

    useEffect(() => setInputLabel(label || ""), [label]);
    useEffect(() => setInputName(name), [name]);
    useEffect(() => setInputType(type || ""), [type]);
    useEffect(() => setInputValue(value || ""), [value]);

    const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (typeof onChange === "function") onChange(event.target.value);
    };

    return (
        <div className="field">
            <label className="label">{inputLabel}</label>
            <input
                className="input is-primary"
                name={inputName}
                type={inputType || "text"}
                value={inputValue}
                onChange={onInputValueChange} />
        </div>
    );

};
