<template>
    <a-config-provider :locale="locale">
        <router-view />
    </a-config-provider>
</template>

<script>
// 将ui组件装换为中文
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default {
    name: 'App',
    data() {
        return {
            locale: zhCN,
        };
    },
};
</script>

<style></style>
