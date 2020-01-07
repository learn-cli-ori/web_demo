import Vue from 'vue';
import App from './App';
import { router } from '@/router/index';
import store from '@/store/index';
import './static/style/reset.scss';

//路由权限
import '@/router/routePermission';
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "babel-polyfill";
// import 'lib-flexible';

Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');