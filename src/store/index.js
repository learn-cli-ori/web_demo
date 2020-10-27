import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: JSON.parse(Cookies.get("userInfo") || null), //用户信息
        routeInfo: JSON.parse(localStorage.getItem("routeInfo") || null), // 路由信息
    },
    mutations: {
        setUserInfo(state, value) {
            state.userInfo = value;
            if (!value) {
                Cookies.remove("userInfo");
            } else {
                Cookies.set("userInfo", JSON.stringify(value));
            }
        },

        setRouteInfo(state, value) {
            state.routeInfo = value;
            if (!value) {
                localStorage.removeItem("routeInfo");
            } else {
                localStorage.setItem("routeInfo", JSON.stringify(value));
            }
        }
    },
    actions: {
        setUserInfo({ commit }, data) {
            commit("setUserInfo", data);
        },
        setRouteInfo({ commit }, data) {
            commit("setRouteInfo", data);
        }
    },
});
