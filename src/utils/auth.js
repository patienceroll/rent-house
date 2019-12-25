const TOKEN_KEY = 'TOKEN';

export class Auth {
    /**
     * 获取用户登录后的 Token。
     */
    static get token() {
        return localStorage[TOKEN_KEY];
    }

    /**
     * 存储用户登录成功后的 Token。
     */
    static set token(value) {
        localStorage[TOKEN_KEY] = value;
    }

    /**
     * 清除当前用户的 Token。
     */
    static clear() {
        localStorage.removeItem(TOKEN_KEY);
    }

    /**
     * 验证用户是否登录。
     */
    static get isAuth() {
        return !!Auth.token;
    }
}
