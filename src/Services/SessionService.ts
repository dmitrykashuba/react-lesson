import {Observable} from "rxjs";
import {Injectable} from "../App/Injectables";
import StorageService from "./StorageService";

export default class SessionService extends Injectable {

    private static TOKEN_KEY = "token";

    private get storage(): StorageService | undefined {
        return SessionService.inject(StorageService);
    }

    public get token(): string | undefined {
        return this.storage?.get(SessionService.TOKEN_KEY);
    }

    public get tokenObservable(): Observable<string> | undefined {
        return this.storage?.getObservable<string>(SessionService.TOKEN_KEY) || undefined;
    }

    public logIn(token: string) {
        this.storage?.set(SessionService.TOKEN_KEY, token);
    }

    public logOut() {
        this.storage?.remove(SessionService.TOKEN_KEY);
    }

}
