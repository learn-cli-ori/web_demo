/* public store commit Methods */
import Cookies from 'js-cookie';
export default {
    setUserInfo(state, value) {
        state.userInfo = value;
        if (!value) {
            Cookies.remove('userInfo');
        } else {
            Cookies.set("userInfo", JSON.stringify(value));
        }
    },

    setRouteInfo(state, value) {
        state.routeInfo = value;
        if (!value) {
            localStorage.removeItem('routeInfo');
        } else {
            localStorage.setItem("routeInfo", JSON.stringify(value))
        }
    },
    setGlobalLoading(state, value) {
        state.globalLoading = value;
    },
};