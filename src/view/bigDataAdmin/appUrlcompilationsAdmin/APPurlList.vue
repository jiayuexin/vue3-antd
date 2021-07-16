<!-- appurl列表 -->
<template>
    <div>
        <SearchCom :list="list" @searchClick="searchClick"></SearchCom>
        <a-button type="primary">新增品牌url合集</a-button>
        <Table
            :data="data"
            :columns="columns"
            :loading="loading"
            :paginationTotal="paginationTotal"
            @changeTable="changeTable"
        >
            <template #action="{record}">
                <a-button type="link" @click="deleteFun(record)">点击</a-button>
            </template>
        </Table>
    </div>
</template>

<script>
import { provide, reactive, ref } from 'vue';
import SearchCom from '@/components/search';
import Table from '@/components/table';
export default {
    components: {
        SearchCom,
        Table,
    },
    setup() {
        // search 搜索数据
        const list = reactive([
            {
                label: 'App名称',
                name: 'appName', //字段名
                value: '',
                list: [], // 用来给下拉 添加数据
                comp: 'input', //组件名称
            },
            {
                label: 'APPID',
                name: 'appID', //字段名
                value: '',
                list: [], // 用来给下拉 添加数据
                comp: 'input', //组件名称
            },
            {
                label: 'APP分类',
                name: 'appType', //字段名
                value: undefined,
                list: [], // 用来给下拉 添加数据
                search: true, //激活搜索功能
                comp: 'select', //组件名称
            },
            {
                label: '是否有效',
                name: 'state', //字段名
                value: '',
                list: [], // 用来给下拉 添加数据
                comp: 'radio', //组件名称
            },
            {
                label: '更新时间',
                name: 'updata_at', //字段名
                value: null,
                list: [], // 用来给下拉 添加数据
                comp: 'date', //组件名称
            },
            {
                label: '更新人',
                name: 'updata_po', //字段名
                value: '',
                list: [], // 用来给下拉 添加数据
                comp: 'input', //组件名称
            },
        ]);
        provide(list);
        // 表格规则个数据
        const columns = ref([
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Age',
                    dataIndex: 'age',
                    key: 'age',
                    width: 80,
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                    key: 'address 1',
                    ellipsis: true,
                    sorter: true,
                },
                {
                    title: 'Long Column Long Column Long Column',
                    dataIndex: 'address',
                    key: 'address 2',
                    ellipsis: true,
                },
                {
                    title: 'Long Column Long Column',
                    dataIndex: 'address',
                    key: 'address 3',
                    ellipsis: true,
                },
                {
                    title: 'Long Column',
                    dataIndex: 'address',
                    key: 'address 4',
                    ellipsis: true,
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    slots: { customRender: 'action' },
                },
            ]),
            data = ref([
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
                    tags: ['nice', 'developer'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
                    tags: ['cool', 'teacher'],
                },
            ]);

        const searchClick = data => {
                console.log(data);
            },
            deleteFun = record => {
                console.log(record);
            };

        // table组件参数以及方法
        const loading = ref(false),
            paginationTotal = reactive({
                page: 1,
                pageSize: 10,
                total: 0,
            }),
            changeTable = data => {
                console.log(data);
                // pagination
                // filters
                // sorter
                // currentDataSource
            };
        return {
            list,
            searchClick,
            deleteFun,
            columns,
            data,
            paginationTotal,
            loading,
            changeTable,
        };
    },
};
</script>
