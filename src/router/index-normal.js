import Vue from "vue";
import Router from "vue-router";
import menu from "./menu";
import store from "@/store/index";
Vue.use(Router);

function reGroupRoute() {
    let router = [];
    menu.map((item) => {
        if (item.children && item.children.length) {
            router = [...router, ...item.children];
        } else {
            router.push(item);
        }
    });
    return router;
}

let routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/login.vue"),
        meta: {
            title: "后台管理系统",
        },
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/index/404.vue"),
    },
    {
        path: "/",
        name: "home",
        component: () => import("@/views/index/home.vue"),
        redirect: { name: "testIndex" },
        children: reGroupRoute(),
    },
    {
        path: "*",
        redirect: { name: "404" },
        hidden: true,
    },
];

export const router = new Router({
    routes,
});

// 导航守卫
router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title || "后台管理系统";
    console.log(to);
    if (!store.state.userInfo && to.name != "login") {
        next({ name: "login" });
    } else {
        if (to.name == "login" && store.state.userInfo) {
            next({ name: "userList" });
        } else {
            next();
        }
    }
});
