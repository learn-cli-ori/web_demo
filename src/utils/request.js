import axios from "axios";
import qs from "qs";
import store from "@/store";
import { Message, Loading } from "element-ui";
import reConfig from "@/reConfig/index";

let defaultContentType = "application/x-www-form-urlencoded; charset=UTF-8";

let baseReauest = (config) => {
    let {
        remote = "", // 域名
        defaultTimeout = 15000, // 接口请求超时时间
        getExtraParams = () => {}, // 接口公共参数
        start = () => {}, // 开始回调
        finish = () => {}, // 结束回调
        success = () => {}, // 成功回调
        fail = () => {}, // 失败回调
    } = config;
    let request = new Object();
    ["post", "del", "put", "get"].map((method) => {
        request[method] = (url, params = {}, extra = {}) => {
            return new Promise((resolve, reject) => {
                //忽略序列化列表
                let ignoreQs = ["multipart/form-data", "application/json"];

                let {
                    text = "", // 加载文字
                    showLoading = true, // 是否显示单条接口的loading
                    showToast = true, // 是否显示单条接口的toast
                    timeout = 0, // 单条接口的请求超时时间
                    // 请求头
                    header = {
                        "content-type": defaultContentType,
                    },
                } = extra;

                let options = {
                    method,
                    url: remote + url,
                    header,
                    timeout: timeout || defaultTimeout,
                    withCredentials: true,
                    crossDomain: true,
                };

                // 添加额外参数
                let extraParams = getExtraParams() || {};

                extraParams &&
                    Object.keys(extraParams).map((key) => {
                        if (!params.hasOwnProperty(key)) {
                            params[key] = extraParams[key];
                        }
                    });

                if (method == "get") {
                    options.params = params;
                } else {
                    options.data = params;
                }

                //不需要格式化
                if (ignoreQs.indexOf(header["Content-Type"]) === -1) {
                    params = qs.stringify(params);
                }

                start();

                if (showLoading) {
                    Loading.service({
                        text,
                        fullscreen: true,
                    });
                }

                axios(options)
                    .then((res) => {
                        // 返回响应时做一些处理
                        success(res.data);
                        if (showLoading) {
                            Loading.service({
                                fullscreen: true,
                            }).close();
                        }
                        console.log(res.data);
                        resolve(res.data);
                    })
                    .catch((err) => {
                        finish(err); // 请求结束回调
                        fail(err); // 请求失败回调
                        if (showLoading) {
                            Loading.service({
                                fullscreen: true,
                            }).close();
                        }

                        if (showToast) {
                            Message({
                                type: "error",
                                message: "请求失败，请稍候重试",
                            });
                        }

                        reject(err);
                    });
            });
        };
    });
    return request;
};

export default baseReauest({
    remote:
        process.env.VUE_APP_TYPE == "production"
            ? process.env.VUE_APP_API_URL
            : reConfig.apiPrefix || "",
    getExtraParams: () => {
        return { access_token: localStorage.getItem("admin-token") || "" };
    },
    success: (response) => {
        if (response.code != 200) {
            Message({
                type: "error",
                message: response.message,
            });
        }
        if (response.code == 401) {
            localStorage.setItem("admin-token", "");
            store.commit("setUserInfo", null);
            location.href = `${location.origin}/#/login`;
            return false;
        }
    },
});
