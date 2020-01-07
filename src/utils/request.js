import axios from 'axios';
import qs from 'qs';
import reConfig from '@/reConfig/index';
import store from '@/store'


export function request(prefix = reConfig.apiPrefix, config = {}) {
    const REQUEST = axiosConfig(prefix, config);
    let { loading } = config;
    //忽略序列化列表
    let ignoreQs = ['multipart/form-data', 'application/json'];

    // 请求时的拦截
    REQUEST.interceptors.request.use((config) => {
        if (loading) store.commit('setGlobalLoading', true);
        // 发送请求之前做一些处理
        return config;
    }, (error) => {
        store.commit('setGlobalLoading', false);
        // 当请求异常时做一些处理
        return Promise.reject(error);
    });

    // 响应时拦截
    REQUEST.interceptors.response.use((response) => {
        store.commit('setGlobalLoading', false);
        // 返回响应时做一些处理
        return response.data;
    }, (error) => {
        store.commit('setGlobalLoading', false);
        // 当响应异常时做一些处理
        return Promise.reject(error);
    });
    return {
        // get 请求将参数加进 config[params]
        get: (url, params, config = {}) => {
            config.params = params;
            return REQUEST.get(url, config);
        },
        // post 请求序列化 params
        post: (url, params) => {
            //兼容上传文件及json类型
            if (ignoreQs.indexOf(config['Content-Type']) === -1) {
                params = qs.stringify(params);
            }
            return REQUEST.post(url, params);
        },
    };
}

function axiosConfig(prefix, config) {
    // 默认请求头
    const DEFAULT_HEADER = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    axios.defaults.withCredentials = true;
    // 开发环境默认使用proxy代理请求
    axios.defaults.baseURL = prefix;
    axios.defaults.timeout = 20000;
    config = {
        'headers': { 'Content-Type': config['Content-Type'] || DEFAULT_HEADER['Content-Type'] },
        ...config
    };
    return axios.create(config);
}