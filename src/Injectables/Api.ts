import {fromFetch} from "rxjs/fetch";
import {Injectable} from "../App/Injectables";

export default class Api extends Injectable {

    private static BASE_PATH = "http://localhost:3001";

    public async post<T>(path: string, body: Object & any): Promise<{data?: T, error?: Response;}> {
        try {
            const response: Response = await fromFetch<T>(Api.BASE_PATH + path, {
                method: "POST",
                body: JSON.stringify(body)
            } as any).toPromise<any>();
            const data = await response.json();
            if (response.ok) return {data};
            throw data;
        } catch (error) {
            return {error};
        }
    }

}
