import Vue from 'vue';
import App from './App';
import { router } from '@/router/index';
import store from '@/store/index';
import './static/style/reset.scss';
// 富文本
import quillEditor from "vue-quill-editor";
//路由权限
// import '@/router/routePermission';

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@babel/polyfill'
// require styles 引入样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
Vue.use(ElementUI);
Vue.use(quillEditor);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');