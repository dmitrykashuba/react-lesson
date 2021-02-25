import {createContext, useContext, PropsWithChildren} from "react";

type InjectableType<T> = T extends Injectable ? T & Injectable : T;

type InjectablesType<T> = Map<string, InjectableType<T>>;

export function useInjectable<T>(
    injectable: new () => InjectableType<T>,
    injectables?: InjectablesType<T>
): InjectableType<T> | undefined {
    if (!injectables) injectables = useContext(InjectorContext);
    try {
        let instance: InjectableType<T> | undefined = injectables.get(injectable.name);
        if (!instance) {
            Object.defineProperty(injectable, "inject", {
                configurable: false,
                writable: false,
                value: (injectable: new () => InjectableType<T>) => useInjectable(injectable, injectables)
            });
            instance = new injectable();
            injectables.set(injectable.name, instance);
        }
        return instance;
    } catch {
        return undefined;
    }
};

export class Injectable {

    protected static readonly inject: <T>(injectable: new () => InjectableType<T>) => InjectableType<T> | undefined;

};

const InjectorContext = createContext(new Map());

const Injectables = ({children}: PropsWithChildren<{}>) => (
    <InjectorContext.Provider value={new Map()}>
        {children}
    </InjectorContext.Provider>
);

export default Injectables;
