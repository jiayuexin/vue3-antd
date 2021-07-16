import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router/index';
import store from './store/index'
const app = createApp(App);
app.config.productionTip = false;
window.localStorage.setItem(
    'token',
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjYzMTQ4MTcsInVzZXJuYW1lIjoiYWRtaW4ifQ.hb_ysdod41K7jaaItHcgubMCHUoezzg_Xgpgs76muEQ'
);
app.use(router)
    .use(store)
    .use(Antd)
    .mount('#app');
