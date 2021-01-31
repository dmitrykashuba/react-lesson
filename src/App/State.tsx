import {createContext, useContext, Dispatch, SetStateAction, PropsWithChildren, useState, useEffect} from "react";

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

    let hidden: string, visibilityChange: string;
    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof (document as any).msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof (document as any).webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    } else {
        visibilityChange = "";
    }

    const pageHide = "onpagehide" in window ? "pagehide" : "beforeunload";

    const stateKey: string = "state";

    const [state, setState] = useState<StateType>({});

    const storeState = () => {
        window.localStorage.setItem(stateKey, JSON.stringify(state));
    };

    const restoreState = () => {
        const restoredState: StateType = JSON.parse(window.localStorage.getItem(stateKey) as string);
        if (restoredState) {
            setState(restoredState);
            window.localStorage.removeItem(stateKey);
        }
    };

    const beforeUnloadHandler = () => storeState();

    const visibilityChangeHandler = () => (document as any)[hidden]
        ? storeState()
        : setTimeout(() => restoreState(), 10);

    useEffect(() => {
        restoreState();
    }, []);

    useEffect(() => {
        window.removeEventListener(pageHide, beforeUnloadHandler, false);
        document.removeEventListener(visibilityChange, visibilityChangeHandler, false);
        window.addEventListener(pageHide, beforeUnloadHandler, false);
        document.addEventListener(visibilityChange, visibilityChangeHandler, false);
        return () => {
            document.removeEventListener(visibilityChange, visibilityChangeHandler, false);
        };
    });

    return (
        <StateContext.Provider value={{state, setState}}>
            {children}
        </StateContext.Provider>
    );

};
