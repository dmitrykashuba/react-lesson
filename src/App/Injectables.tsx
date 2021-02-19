import {createContext, useContext, PropsWithChildren} from "react";

type InjectableType<T> = T extends Injectable ? T & Injectable : T;

type InjectablesType<T> = Map<string, InjectableType<T>>;

const InjectorContext = createContext<InjectablesType<any>>(undefined as any);

function useInjectable<T>(
    injectable: new () => InjectableType<T>,
    injectables?: InjectablesType<T>
): InjectableType<T> | undefined {

    if (!injectables) injectables = useContext(InjectorContext);
    try {
        const name: string | undefined = injectable.name;
        if (!name) return undefined;
        let instance: InjectableType<T> | undefined = injectables.get(name);
        if (!instance) {
            instance = new injectable();
            Object.defineProperty(instance, "inject", {
                configurable: false,
                writable: false,
                value: (injectable: new () => InjectableType<T>) => useInjectable(injectable, injectables)
            });
            injectables.set(name, instance);
        }
        return instance;
    } catch {
        return undefined;
    }

};

class Injectable {

    protected readonly inject!: <T>(injectable: new () => InjectableType<T>) => InjectableType<T> | undefined;

};

const Injectables = ({children}: PropsWithChildren<{}>) => {

    const injectables: InjectablesType<any> = new Map();

    return (
        <InjectorContext.Provider value={injectables}>
            {children}
        </InjectorContext.Provider>
    );

};

export default Injectables;

export {useInjectable, Injectable};
