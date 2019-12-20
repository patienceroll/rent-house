import BASE_URL from './url';

export class API {
    static baseUrl = BASE_URL;
    static async get(url) {
        return (await fetch(API.baseUrl + encodeURI(url))).json()
    }
}


