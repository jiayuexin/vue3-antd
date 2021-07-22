<!-- 公共table -->
<template>
    <div style="padding-top: 10px">
        <!-- 该表格还没有遇到特别场景,无需考虑太多,有其他场景在优化 -->
        <a-table
            :columns="columns"
            :data-source="data"
            :row-key="record => record.id"
            :loading="loading"
            :pagination="pagination"
            @change="handleTableChange"
            :bordered="true"
            :row-selection="isRawSelect ? rowSelection : null"
            :size="size"
        >
            <template v-for="(item, index) in slot" :key="index" #[item]="{text,record}">
                <slot :name="item" :text="text" :record="record"></slot>
            </template>
        </a-table>
    </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
    props: {
        columns: Array,
        data: Array,
        paginationTotal: Object,
        loading: Boolean,
        total: Number,
        // isRawSelect  rowSelection   必须搭配使用
        isRawSelect: {
            type: Boolean,
            default: false,
        },
        rowSelection: Object,
        size: {
            type: String,
            default: 'default', // default | middle | small
        },
    },
    setup(props, { emit }) {
        // 用到该组件的slot处理
        const arr = props.columns.map(res => res.slots?.customRender);
        const slot = ref([]);
        arr.forEach(res => {
            if (res) slot.value.push(res);
        });
        const pagination = computed(() => ({
            current: props.paginationTotal.pageNo, // 当前页
            pageSize: props.paginationTotal.pageSize, // 传过来的一个展示页数
            total: props.total, // 总条数
            pageSizeOptions: ['10', '20', '30', '40'], // 可以切换每页展示条数
            showQuickJumper: true, //是否允许跳转
            showSizeChanger: true, // 是否可以改变每页条数
            showTotal: (total, range) => `共${total}条 当前显示${range[0]} - ${range[1]}条`,
        }));
        // 点击分页时的回调
        const handleTableChange = (pagination, filters, sorter) => {
            // , { currentDataSource }   第四个参数暂时不需要   ,需要时传回去即可
            emit('changeTable', { pagination, filters, sorter });
        };

        return {
            slot,
            handleTableChange,
            pagination,
        };
    },
};
</script>
