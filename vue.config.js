const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir);
};

module.exports = {
    productionSourceMap: false,
    publicPath: './',
    chainWebpack: config => {
        // 快捷路径地址，可自定义键值对
        config.resolve.alias.set('@', resolve('src'));
    },

    css: {
        loaderOptions: {
            // 全局引入 scss
            sass: {
                prependData: `@import "~@/static/style/theme.scss";`
            }
        },
    },
    devServer: {
        port: 8085, // 端口号
        disableHostCheck: true,
        https: false,
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                target: process.env.VUE_APP_API_URL,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        } // 配置多个代理
    }
};