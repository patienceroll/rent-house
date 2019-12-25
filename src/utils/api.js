import  {BASE_URL } from './url';

export class API {
    static contentType = {
        json: 'Application/json'
    }

    static baseUrl = BASE_URL;

    static parseQueryString(params, mark = false) {
        return (mark ? '?' : '') + Object.keys(params).map(i => `${ i }=${ params[i] }`).join('&');
    }

    /**
     * GET 请求函数。
     * @param {String} url API 地址。
     * @param {Array | Object} params 参数或者路由参数数组。
     */
    static async get(url, params) {
        const args = params ? params instanceof Array ? params.join('/') : API.parseQueryString(params, true) : '';
        return (await fetch(API.baseUrl + url + args)).json()
    }

    // ('/prod/', {price: '4000'}) // RESTful
    static async post(url, params, routeParams = [], type = 'json') {
        return (await fetch(API.baseUrl + url + routeParams.join('/'), {
            headers: {
                'Content-Type': API.contentType[type]
            },
            method: 'post', body: JSON.stringify(params)
        })).json();
    }
}
