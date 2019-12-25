import BASE_URL from './url';

export class API {
    static baseUrl = BASE_URL;
    // static parseParams = (params) => {
    //     return params.map(item=>)
    // }
    static contentType = {
        json: 'application/json'
    }
    static async get(url) {
        return (await fetch(API.baseUrl + encodeURI(url))).json()
    }

    static async post(url, params, routeParams = []) {
        console.log('p',params)
        return (await fetch(API.baseUrl + url + routeParams.join('/'), {
            headers: {
                'Content-Type': API.contentType.json
            },
            method: 'post', body: JSON.stringify(params)
        })).json()
    }
}


