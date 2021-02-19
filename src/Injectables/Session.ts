import {Observable} from "rxjs";
import {Injectable} from "../App/Injectables";
import Api from "../Injectables/Api";
import Storage from "../Injectables/Storage";

export default class Session extends Injectable {

    private static TOKEN_KEY = "token";

    private get api(): Api | undefined {
        return this.inject(Api);
    }

    private get storage(): Storage | undefined {
        return this.inject(Storage);
    }

    public get token(): string | undefined {
        return this.storage?.get(Session.TOKEN_KEY);
    }

    public get tokenObservable(): Observable<string> | undefined {
        return this.storage?.getObservable<string>(Session.TOKEN_KEY) || undefined;
    }

    public async logIn(login?: string, password?: string) {
        if (this.api && login && password) {
            const {data, error} = await this.api.post<{token: string;}>("/login", {login, password});
            if (!error && data?.token) {
                console.log(data.token);
                this.storage?.set(Session.TOKEN_KEY, data.token);
            }
        }
    }

    public logOut() {
        this.storage?.remove(Session.TOKEN_KEY);
    }

}
