import axios from 'axios';
axios.interceptors.request.use(
    request => {
        console.log(request, '请求');
    },
    error => {
        console.log(error, '请求error');
    }
);
axios.interceptors.response.use(
    response => {
        console.log(response, '结果');
    },
    error => {
        console.log(error, '结果error');
    }
);
export default axios;
