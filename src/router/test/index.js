import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const test = () =>
    import ('@/views//test/test.vue');
const error = () =>
    import ('@/views/index/404.vue');
const home = () =>
    import ('@/views/index/home.vue');

export const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/test/index',
            name: 'test',
            component: test
        }, {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/404',
            filePath: '/index/404',
            component: error
        }
    ]
});

//默认路由
export const defalRouter = [{
    path: '/',
    name: 'menuIndex',
    component: () =>
        import ('@/views/index/menuIndex.vue'),
    redirect: { name: 'login' },
    children: [{
        meta: { title: '首页' },
        path: '/home',
        filePath: '/index/home',
        name: 'home',
    }]
}];

export function routerGo(to, next, getRouter) {
    getRouter = [...filterAsyncRouter(getRouter), ...[{
        "path": "*",
        "redirect": "/404",
        "hidden": true
    }]]; //过滤路由

    router.addRoutes(getRouter); //动态添加路由
    next({...to, replace: true });
}

export function filterAsyncRouter(asyncRouterMap, isChildren) { //遍历后台传来的路由字符串，转换为组件对象
    const accessedRouters = asyncRouterMap.filter(route => {
        if (isChildren && !route.component && !route.isParent) {
            route.component = () =>
                import (`@/views${route.filePath || route.path}.vue`);
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, true);
        }
        return true;
    });

    console.log(accessedRouters);

    return accessedRouters;
}