export { BASE_URL } from './url'
export { API } from './api'

export const CITY_KEY = 'CITY';

export function getCurrentCity() {
    return new Promise((ok, err) => {
        // 拿本地存储中的城市信息。
        const city = localStorage[CITY_KEY];

        // 判断拿到没有，如果有，直接 resolve。
        if (city) ok(JSON.parse(city))
        else try {
            const city = new window.BMap.LocalCity();

            city.get(async ({ name }) => {
                const { body } = await (await fetch('http://127.0.0.1:8080/area/info?name=' + name)).json();
                // 获取成功后，存储到本地存储。
                localStorage[CITY_KEY] = JSON.stringify(body);
                // 返回获取到的城市信息对象。
                ok(body);
            });
        } catch (e) { err(e) }
    });
}
