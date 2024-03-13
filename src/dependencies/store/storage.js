import { STORAGE_LOCATION, STORAGE_PAYMENT_SESSION, STORAGE_USER } from '../../constants/applicationConstants'

class Storage {
    getUser() {
        return JSON.parse(localStorage.getItem(STORAGE_USER));
    }

    setUser(user) {
        localStorage.setItem(STORAGE_USER, JSON.stringify(user));
    }

    setPaymentSessionID(id) {
        localStorage.setItem(STORAGE_PAYMENT_SESSION, id);
    }

    getPaymentSessionID() {
        return localStorage.getItem(STORAGE_PAYMENT_SESSION)
    }

    removePaymentSession() {
        localStorage.removeItem(STORAGE_PAYMENT_SESSION)
    }

    setLocation(location) {
        localStorage.setItem(STORAGE_LOCATION, location);
    }

    getLocation() {
        return localStorage.getItem(STORAGE_LOCATION)
    }

    getJwtToken() {
        if (localStorage.getItem(STORAGE_USER) !== 'undefined') {
            let obj = JSON.parse(localStorage.getItem(STORAGE_USER));
            if (obj && obj.token && obj.token.length > 0) {
                return obj.token;
            }
        }
        return '';
    }

    getUserRole() {
        if (localStorage.getItem(STORAGE_USER) !== 'undefined') {
            let obj = JSON.parse(localStorage.getItem(STORAGE_USER));
            if (obj && obj.token && obj.token.length > 0) {
                return (obj && obj.user && obj.user.role) || "";
            }
        }
        return '';
    }

    isLoggedIn() {
        if (localStorage.getItem(STORAGE_USER) !== 'undefined') {
            let obj = JSON.parse(localStorage.getItem(STORAGE_USER));
            if (obj && obj.token && obj.token.length > 0) {
                return true;
            }
        }
        return false;
    }
    clear() {
        localStorage.clear();
    }
}
let storage = new Storage();
export { storage }