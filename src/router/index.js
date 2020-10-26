import Vue from "vue";
import Router from "vue-router";
// import menu from "./menu";

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch((err) => console.log(err));
};

Vue.use(Router);

export const router = new Router({
    routes: [
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/login/index.vue"),
            meta: {
                title: "demo",
            },
        },
        {
            path: "/404",
            filePath: "/index/404",
            component: () => import("@/views/index/404.vue"),
        },
    ],
});

//默认路由
export const defaultRouter = [
    {
        path: "/",
        name: "main",
        component: () => import("@/views/index/main.vue"),
        redirect: { name: "testIndex" },
        children: [],
    },
];
