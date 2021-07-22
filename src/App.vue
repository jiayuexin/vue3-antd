<template>
    <a-config-provider :locale="locale">
        <!-- 标号   1 -->
        <!-- 这里如果直接写这个router-view 的话,那路由中肯定设置了重定向路由,所有这里会显示重定向后的路由 -->
        <router-view />
        <!-- 标号   2 -->
        <!-- 如果在这里挂载了一个组件的话, 那路由中肯定没有且套路由,因为router.push的话,会找不到且套中的路由,建议使用第二种 -->
        <!-- <Home /> -->
    </a-config-provider>
</template>

<script>
// 将ui组件装换为中文
import zh_CN from 'ant-design-vue/es/locale/zh_CN';
import { login } from '@/api/index';
// import Home from '@/view/home/index';
export default {
    name: 'App',
    data() {
        return {
            locale: zh_CN,
        };
    },
    // components: { Home },
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
