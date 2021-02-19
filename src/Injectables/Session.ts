import {Observable} from "rxjs";
import {Injectable} from "../App/Injectables";
import Storage from "../Injectables/Storage";

export default class Session extends Injectable {

    private static TOKEN_KEY = "token";

    private get storage(): Storage | undefined {
        return this.inject(Storage);
    }

    public get token(): string | undefined {
        return this.storage?.get(Session.TOKEN_KEY);
    }

    public get tokenObservable(): Observable<string> | undefined {
        return this.storage?.getObservable<string>(Session.TOKEN_KEY) || undefined;
    }

    public logIn(token: string) {
        this.storage?.set(Session.TOKEN_KEY, token);
    }

    public logOut() {
        this.storage?.remove(Session.TOKEN_KEY);
    }

}
