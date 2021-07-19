// 配置清除警告
const plugins = [];
if (process.env.ENV_NODE === 'proudction') {
    plugins.push([
        'transform-remove-console',
        {
            exclude: ['warn'],
        },
    ]);
}

module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [...plugins],
};
