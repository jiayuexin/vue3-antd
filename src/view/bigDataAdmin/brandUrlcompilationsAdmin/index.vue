<!-- 品牌url合集 -->
<template>
    <div>
        <a-tabs type="card" v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="品牌url合集列表"></a-tab-pane>
            <a-tab-pane key="2" tab="批量导入"></a-tab-pane>
        </a-tabs>
        <!-- appurl列表 -->
        <brankUrlList v-if="activeKey === '1'"></brankUrlList>
    </div>
</template>
<script>
import { ref } from 'vue';
import brankUrlList from './brankUrlList.vue';
export default {
    components: {
        brankUrlList,
    },
    setup() {
        const activeKey = ref('1');
        return {
            activeKey,
        };
    },
};
</script>
