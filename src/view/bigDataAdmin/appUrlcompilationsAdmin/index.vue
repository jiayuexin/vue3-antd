<!-- // appurl管理 -->
<template>
    <div>
        
        <a-tabs type="card" v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="APPurl合集列表"></a-tab-pane>
            <a-tab-pane key="2" tab="批量导入"></a-tab-pane>
        </a-tabs>
        <!-- appurl列表 -->
        <appUrlList v-if="activeKey === '1'"></appUrlList>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import appUrlList from './APPurlList.vue';
export default {
    components: {
        appUrlList,
    },
    setup() {
        const router = useRouter();
        console.log(router.options.routes[1]);
        const activeKey = ref('1');
        return {
            activeKey,
        };
    },
};
</script>
