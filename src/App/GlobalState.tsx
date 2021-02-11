import {createContext, useContext, Dispatch, SetStateAction, PropsWithChildren, useState} from "react";

type GlobalStateType = {
    token?: string;
};

type GlobalStateContextType = {
    state: GlobalStateType,
    setState: Dispatch<SetStateAction<GlobalStateType>>;
};

export const GlobalStateContext = createContext<GlobalStateContextType>({state: {}, setState: () => undefined});

export const useGlobalState: () => GlobalStateContextType = () => useContext(GlobalStateContext);

export default ({children}: PropsWithChildren<{}>) => {

    const [state, setState] = useState<GlobalStateType>({});

    return (
        <GlobalStateContext.Provider value={{state, setState}}>
            {children}
        </GlobalStateContext.Provider>
    );

};
