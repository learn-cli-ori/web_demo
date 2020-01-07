import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';
import mutations from './mutations';
import actions from './actions';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        globalLoading: false, // 路由容器全局loading
        userInfo: JSON.parse(Cookies.get("userInfo") || null), //用户信息
        routeInfo: JSON.parse(localStorage.getItem("routeInfo") || null) // 路由信息
    },
    mutations,
    actions
});