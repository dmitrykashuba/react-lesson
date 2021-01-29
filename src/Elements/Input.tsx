import {useState, useEffect, ChangeEvent} from "react";

type Props = {
    label?: string;
    type?: "text" | "password";
    value?: string;
    onChange?: (value: string) => void;
};

export default ({label, type, value, onChange: onValueChange}: Props) => {

    const [inputLabel, setInputLabel] = useState(label || "");
    const [inputType, setInputType] = useState(type || "");
    const [inputValue, setInputValue] = useState(value || "");

    useEffect(() => setInputLabel(label || ""), [label]);
    useEffect(() => setInputType(type || ""), [type]);
    useEffect(() => setInputValue(value || ""), [value]);
    useEffect(() => {
        if (typeof onValueChange === "function") onValueChange(inputValue);
    }, [inputValue]);

    const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="field">
            <label className="label">{inputLabel}</label>
            <input
                className="input is-primary"
                type={inputType || "text"}
                value={inputValue}
                onChange={onInputValueChange} />
        </div>
    );

};
