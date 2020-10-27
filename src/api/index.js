import request from "@/utils/request";

// 登录
export const adminLogin = (params) =>
    request.get("/admin/adminLogin", params, {
        loading: true,
    });

// 修改密码
export const updatePwd = (params) =>
    request.get("/admin/updatePwd", params);

// 退出登录
export const quitLogin = (params) =>
    request.get("/admin/quitLogin", params);
