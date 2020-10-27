/*
 * @Author: lyh
 * @Date: 2019-11-06 11:44:21
 * @Last Modified by: lyh
 * @Last Modified time: 2020-10-27 16:00:21
 * @Desc 获取权限
 */

import { router, defaultRouter } from "@/router";
import store from "@/store";
import menu from "./menu";

var getRouter = null; //用来获取后台拿到的路由
const whiteList = ["/login", "/404"]; // 不重定向白名单

// 重组路由对象
function reGroup(menuList) {
    let childrenRouter = [];
    let allRouter = defaultRouter;
    menuList.map((item) => {
        if (item.children && item.children.length) {
            childrenRouter = [...childrenRouter, ...item.children];
        } else {
            childrenRouter.push(item);
        }
    });
    defaultRouter[0].children = childrenRouter;
    return allRouter;
}

export function routerGo(to, next, getRouter) {
    getRouter = [...filterAsyncRouter(getRouter)]; //过滤路由
    router.addRoutes(getRouter); //动态添加路由
    next({ ...to, replace: true });
}

export function filterAsyncRouter(asyncRouterMap, isChildren) {
    //遍历后台传来的路由字符串，转换为组件对象
    const accessedRouters = asyncRouterMap.map((route) => {
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, true);
        } else if (!route.component) {
            route.component = () =>
                import(`@/views${route.filePath || route.path}.vue`);
        }

        return route;
    });
    return accessedRouters;
}



// 导航守卫
router.beforeEach(async (to, from, next) => {

    document.title = to.meta.title || "demo";
    if (store.state.userInfo) {
        if (to.path === "/login") {
            next({
                name: "testIndex",
            });
        } else {
            const hasRoute =
                store.state.routeInfo && store.state.routeInfo.length > 0;
            if (!getRouter || !hasRoute) {
                //不加这个判断，路由会陷入死循环
                if (!store.state.routeInfo) {
                    store.commit("setRouteInfo", menu);
                    getRouter = reGroup(menu);
                    routerGo(to, next, getRouter); //执行路由跳转方法
                    // let { code, data } = await getAdminAuthority();
                    // if (code == 200) {
                    //     if (!data) {
                    //         //清空用户
                    //         store.commit('setUserInfo', null);
                    //         //清空路由
                    //         store.commit('setRouteInfo', null);
                    //         next('/login');
                    //         return;
                    //     }
                    //     store.commit('setRouteInfo', data);
                    //     getRouter = reGroup(data);
                    //     routerGo(to, next, getRouter); //执行路由跳转方法
                    // }
                } else {
                    //从缓存拿路由
                    getRouter = reGroup(store.state.routeInfo);
                    routerGo(to, next, getRouter);
                }
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            //清空路由
            store.commit("setRouteInfo", null);
            next("/login");
        }
    }
});
