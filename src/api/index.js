import api from './request';
const domain = '/api/';
const login = time =>
    api.post(`${domain}sys/login`, {
        captcha: 'ulwx',
        checkKey: time,
        password: '111111',
        username: 'admin',
    });
const appUrlList = params => api.get(`${domain}url/urlCollection/appUrlList`, { params });
const listAppCategory = () => api.get(`${domain}app/listAppCategory`);
const listChannelType = () => api.get(`${domain}brand/listChannelType`)
const brandUrlList = params => api.get(`${domain}url/urlCollection/brandUrlList`, {params})
export {
    appUrlList, // app url table列表
    listAppCategory, // app 级联分类   search
    login, // 登录
    listChannelType, // 品牌分类列表
    brandUrlList, // 品牌table 列表
};

// export default    只能导出一个
