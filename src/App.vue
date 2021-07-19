<template>
    <a-config-provider :locale="locale">
        <router-view />
    </a-config-provider>
</template>

<script>
// 将ui组件装换为中文
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import { login } from '@/api/index';
export default {
    name: 'App',
    data() {
        return {
            locale: zh_CN,
        };
    },
    created() {
        const time = new Date().getTime();
        login(time).then(res => {
            const { result, success } = res;
            if (success) {
                window.localStorage.setItem('token', result.token);
                window.localStorage.setItem('userInfo', result.userInfo);
            }
        });
    },
};
</script>

<style></style>
