import axios from 'axios';
axios.interceptors.request.use(request => {
    if (request.url !== '/api/sys/login') {
        request.headers['X-Access-Token'] = window.localStorage.getItem('token');
    }
    request.headers['Content-Type'] = 'application/json;charset=UTF-8';
    console.log(request);
    return request;
});
axios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        console.log(error);
    }
);
export default axios;
