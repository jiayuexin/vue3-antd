import api from './request';
const domain = '/api/';
const login = time =>
    api.post(`${domain}sys/login`, {
        captcha: 'ulwx',
        checkKey: time,
        password: '111111',
        username: 'admin',
    });
const appUrlList = parmas => api.get(`${domain}url/urlCollection/appUrlList`, parmas);
const listAppCategory = () => api.get(`${domain}app/listAppCategory`);
export {
    appUrlList, // app url table列表
    listAppCategory, // app 级联分类   search
    login, // 登录
};

// export default    只能导出一个
