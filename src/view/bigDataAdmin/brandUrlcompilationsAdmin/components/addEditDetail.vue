<!-- 新增   编辑    详情 -->
<template>
    <div @click="showDrawer">
        <slot></slot>
        <a-drawer
            :title="`${title}品牌url合集`"
            :width="1200"
            :visible="visible"
            :body-style="{ paddingBottom: '80px', padding: 0 }"
            @close="onClose"
        >
            <a-alert
                message="基础信息"
                type="success"
                style="height: 50px;font-size: 16px;font-weight: 900"
            />
            <BasicsInfo :title="title"></BasicsInfo>
            <a-alert
                message="渠道信息"
                type="success"
                style="height: 50px;font-size: 16px;font-weight: 900"
            />
        </a-drawer>
    </div>
</template>
<script>
import { ref } from 'vue';
import BasicsInfo from './block/basicsInfo.vue';
export default {
    components: {
        BasicsInfo,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    setup() {
        let visible = ref(false);
        const onClose = () => {
                visible.value = false;
            },
            showDrawer = () => {
                visible.value = true;
            };

        return {
            visible,
            showDrawer,
            onClose,
        };
    },
};
</script>
