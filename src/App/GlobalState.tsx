import {createContext, useContext, Dispatch, SetStateAction, PropsWithChildren, useState, useEffect} from "react";

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

    const [state, setState] = useState<GlobalStateType>({});

    const storeState = () => {
        window.localStorage.setItem(stateKey, JSON.stringify(state));
    };

    const restoreState = () => {
        const restoredState: GlobalStateType = JSON.parse(window.localStorage.getItem(stateKey) as string);
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
        <GlobalStateContext.Provider value={{state, setState}}>
            {children}
        </GlobalStateContext.Provider>
    );

};
