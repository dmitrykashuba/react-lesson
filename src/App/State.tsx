import {createContext, useContext, Dispatch, SetStateAction, PropsWithChildren, useState} from "react";

type StateType = {
    token?: string;
};

type StateContextType = {
    state: StateType,
    setState: Dispatch<SetStateAction<StateType>>;
};

export const StateContext = createContext<StateContextType>({state: {}, setState: () => undefined});

export const takeState: () => StateContextType = () => useContext(StateContext);

export default ({children}: PropsWithChildren<{}>) => {

    const [state, setState] = useState<StateType>({});

    return (
        <StateContext.Provider value={{state, setState}}>
            {children}
        </StateContext.Provider>
    );

};
