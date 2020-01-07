/*
 * @Author: lyh
 * @Date: 2019-11-06 11:44:21
 * @Last Modified by: lyh
 * @Last Modified time: 2020-01-06 16:28:20
 * @Desc 获取权限
 */

import { router, routerGo, defalRouter } from '@/router';
import { getAdminAuthority } from '@/api/user';
import store from '@/store';


var getRouter = null; //用来获取后台拿到的路由

// 重组路由对象
function reGroup(params) {
    //按需求设置
    let tempRoute = [...defalRouter];

    tempRoute[0].children = [...tempRoute[0].children, ...params];
    return tempRoute;
}

const whiteList = ['/login', '/404']; // 不重定向白名单

// 导航守卫
router.beforeEach(async(to, from, next) => {
    document.title = to.meta.title || 'demo';
    if (store.state.userInfo) {
        if (to.path === '/login') {
            next({
                path: '/home'
            });
        } else {
            if (!getRouter) { //不加这个判断，路由会陷入死循环
                if (!store.state.routeInfo) {
                    let { code, data } = await getAdminAuthority();
                    if (code == 200) {
                        if (!data) {
                            //清空用户
                            store.commit('setUserInfo', null);
                            //清空路由
                            store.commit('setRouteInfo', null);
                            next('/login');
                            return;
                        }
                        store.commit('setRouteInfo', data);
                        getRouter = reGroup(data);
                        routerGo(to, next, getRouter); //执行路由跳转方法
                    }
                    // getAdminAuthority().then((res) => {
                    //     if (res.code == 200) {
                    //         if (!res.data) {
                    //             //清空用户
                    //             store.commit('setUserInfo', null);
                    //             //清空路由
                    //             store.commit('setRouteInfo', null);
                    //             next('/login');
                    //             return;
                    //         }
                    //         store.commit('setRouteInfo', res.data);
                    //         getRouter = reGroup(res.data);
                    //         routerGo(to, next, getRouter); //执行路由跳转方法
                    //     }
                    // }).catch((e) => {
                    //     console.log(e);
                    // });
                } else { //从缓存拿路由
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
            store.commit('setRouteInfo', null);
            next('/login');
        }
    }
});