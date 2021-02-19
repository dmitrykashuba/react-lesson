import {createContext, useContext, Dispatch, SetStateAction, PropsWithChildren, useState, useEffect} from "react";

type GlobalStateType = {
    token?: string;
};

type GlobalStateContextType = [
    GlobalStateType,
    Dispatch<SetStateAction<GlobalStateType>>
];

const GlobalStateContext = createContext<GlobalStateContextType>([{}, () => undefined]);

const useGlobalState: () => GlobalStateContextType = () => useContext(GlobalStateContext);

const GlobalState = ({children}: PropsWithChildren<{}>) => {

    let hiddenProprtyName: string, visibilityChangeEventName: string;

    if (typeof document.hidden !== "undefined") {
        hiddenProprtyName = "hidden";
        visibilityChangeEventName = "visibilitychange";
    } else if (typeof (document as any).msHidden !== "undefined") {
        hiddenProprtyName = "msHidden";
        visibilityChangeEventName = "msvisibilitychange";
    } else if (typeof (document as any).webkitHidden !== "undefined") {
        hiddenProprtyName = "webkitHidden";
        visibilityChangeEventName = "webkitvisibilitychange";
    } else {
        visibilityChangeEventName = "";
    }

    const pageHideEventName = "onpagehide" in window ? "pagehide" : "beforeunload";

    const stateKey: string = "state";

    const [state, setState] = useState<GlobalStateType>({});

    const storeStateInLocalStorage = () => {
        window.localStorage.setItem(stateKey, JSON.stringify(state));
    };

    const restoreStateFromLocalStorage = () => {
        const restoredState: GlobalStateType = JSON.parse(window.localStorage.getItem(stateKey) as string);
        if (restoredState) {
            setState(restoredState);
            window.localStorage.removeItem(stateKey);
        }
    };

    const pageHideHandler = () => storeStateInLocalStorage();

    const visibilityChangeHandler = () => (document as any)[hiddenProprtyName]
        ? storeStateInLocalStorage()
        : setTimeout(() => restoreStateFromLocalStorage(), 10);

    useEffect(() => {
        restoreStateFromLocalStorage();
    }, []);

    useEffect(() => {
        window.removeEventListener(pageHideEventName, pageHideHandler, false);
        window.addEventListener(pageHideEventName, pageHideHandler, false);
        if (visibilityChangeEventName) {
            document.removeEventListener(visibilityChangeEventName, visibilityChangeHandler, false);
            document.addEventListener(visibilityChangeEventName, visibilityChangeHandler, false);
        }
        return () => {
            if (visibilityChangeEventName) {
                document.removeEventListener(visibilityChangeEventName, visibilityChangeHandler, false);
            }
        };
    });

    return (
        <GlobalStateContext.Provider value={[state, setState]}>
            {children}
        </GlobalStateContext.Provider>
    );

};

export default GlobalState;

export {useGlobalState};
