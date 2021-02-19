import {Subject, Observable} from "rxjs";
import {Injectable} from "../App/Injectables";

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

export class Storage extends Injectable {

    private static KEY: string = "storage";

    private emitters: {[key: string]: Subject<any>;} = {};

    private inMemoryStorage: Object & any = {};

    constructor() {
        super();
        this.restoreStateFromLocalStorage();
        window.removeEventListener(pageHideEventName, this.pageHideHandler.bind(this));
        window.addEventListener(pageHideEventName, this.pageHideHandler.bind(this));
        if (visibilityChangeEventName) {
            document.removeEventListener(visibilityChangeEventName, this.visibilityChangeHandler.bind(this));
            document.addEventListener(visibilityChangeEventName, this.visibilityChangeHandler.bind(this));
        }
    }

    public getObservable<T>(key: string): Observable<T | any> {
        return (this.emitters[key] || (this.emitters[key] = new Subject<T | any>())).asObservable();
    }

    public get(key: string): any | undefined {
        if (key) return this.parseValue(this.inMemoryStorage[key]);
    }

    public set(key: string, value: any) {
        if (key) {
            value = this.stringifyValue(value);
            this.inMemoryStorage[key] = value;
            if (this.emitters[key] instanceof Subject) this.emitters[key].next(value);
        }
    }

    public remove(key: string) {
        if (key) {
            delete this.inMemoryStorage[key];;
            if (this.emitters[key] instanceof Subject) this.emitters[key].next(undefined);
        }
    }

    private parseValue(value: any): any {
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    }

    private stringifyValue(value: any): any {
        return value && typeof value === "object" ? JSON.stringify(value) : value;
    }

    private pageHideHandler() {
        this.storeStateInLocalStorage();
    }

    private visibilityChangeHandler() {
        (document as any)[hiddenProprtyName]
            ? this.storeStateInLocalStorage()
            : setTimeout(() => this.restoreStateFromLocalStorage(), 10);
    }

    private storeStateInLocalStorage() {
        window.localStorage.setItem(Storage.KEY, JSON.stringify(this.inMemoryStorage));
    };

    private restoreStateFromLocalStorage() {
        const restored: any = JSON.parse(window.localStorage.getItem(Storage.KEY) as string);
        if (restored) {
            window.localStorage.removeItem(Storage.KEY);
            this.inMemoryStorage = restored;
            Object.keys(this.emitters).forEach((key: string) => {
                if (this.emitters[key] instanceof Subject) this.emitters[key].next(this.inMemoryStorage[key] || undefined);
            });
        }
    }

}
