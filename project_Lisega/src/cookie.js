import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
const COOKIE_NAME = 'token'

class CookieHandler {
    getToken() {
        return Cookies.get(COOKIE_NAME)
    }
    
    setToken(token) {
        Cookies.set(COOKIE_NAME, token)
    }
    
    removeToken() {
        Cookies.remove(COOKIE_NAME)
    }
    
    isLoggedIn() {
        return !!Cookies.get(COOKIE_NAME)
    }
    
    isAccessTokenExpired() {
        if (this.isLoggedIn()) {
            const { exp } = jwt_decode(this.getToken())
            return (exp - Date.now() / 1000 ) <= 0
        }
        else {
            return undefined
        }
    }

    isFasi() {
        if (this.isLoggedIn()) {
            const { isFasi } = jwt_decode(this.getToken())
            return isFasi
        }
        else {
            return false
        }
    }
}

export default new CookieHandler()