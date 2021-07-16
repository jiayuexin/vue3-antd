
// path  地址路径处理
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '^/api': {
                target: process.env.VUE_APP_HTTP_API, // dev地址
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/',
                },
            },
        },
    },
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'));
    },
};
