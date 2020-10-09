import Vue from 'vue';
import Router from 'vue-router';
// import menu from "./menu";

Vue.use(Router);

export const router = new Router({
    routes: [{
        path: '/login',
        name: 'login',
        component: () => import("@/views/login/login.vue"),
        meta: {
            title: 'demo'
        }
    }, {
        path: '/404',
        filePath: '/index/404',
        component: () => import("@/views/index/404.vue"),
    }]
});

//默认路由
export const defaultRouter = [{
    path: '/',
    name: 'home',
    component: () =>
        import ('@/views/index/home.vue'),
    redirect: { name: "testIndex" },
    children: []
}];
