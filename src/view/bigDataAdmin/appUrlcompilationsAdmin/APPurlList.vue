<!-- appurl列表 -->
<template>
    <div>
        <SearchCom :list="list" @searchClick="searchClick"></SearchCom>
        <a-button type="primary">新增品牌url合集</a-button>
        <Table
            :data="data"
            :columns="columns"
            :loading="loading"
            :total="total"
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
import { provide, reactive, ref, onMounted } from 'vue';
import SearchCom from '@/components/search';
import Table from '@/components/table';
import { listAppCategory, appUrlList } from '@/api/index';
export default {
    components: {
        SearchCom,
        Table,
    },
    setup() {
        // search 搜索数据
        const list = ref([
            {
                label: 'url合集ID',
                name: 'urlCollectionId', //字段名
                value: '',
                comp: 'input', //组件名称
            },
            {
                label: 'App名称',
                name: 'appName', //字段名
                value: '',
                comp: 'input', //组件名称
            },
            {
                label: 'APPID',
                name: 'appId', //字段名
                value: '',
                comp: 'input', //组件名称
            },
            {
                label: 'APP分类',
                name: 'appType', //字段名
                value: [],
                list: [], // 用来给下拉 添加数据
                search: true, //激活搜索功能
                comp: 'cascader', //组件名称
            },
            {
                label: '最近一次上传时间',
                name: 'Time', //字段名
                value: null,
                list: [], // 用来给下拉 添加数据
                comp: 'date', //组件名称
            },
            {
                label: '上传人',
                name: 'updateBy', //字段名
                value: '',
                list: [], // 用来给下拉 添加数据
                comp: 'input', //组件名称
            },
            {
                label: 'APP是否有效',
                name: 'status', //字段名
                value: '',
                list: [
                    {
                        id: 0,
                        name: '无效',
                    },
                    {
                        id: 1,
                        name: '有效',
                    },
                ],
                comp: 'radio', //组件名称
            },
            {
                label: 'url是否上传',
                name: 'upload', //字段名
                value: '',
                list: [
                    {
                        id: 0,
                        name: '否',
                    },
                    {
                        id: 1,
                        name: '是',
                    },
                ], // 用来给下拉 添加数据
                comp: 'radio', //组件名称
            },
        ]);
        provide(list);
        // 表格规则个数据
        const columns = [
            {
                title: 'url合集ID',
                dataIndex: 'urlCollectionId',
                key: 'urlCollectionId',
            },
            {
                title: '品牌ID',
                dataIndex: 'appId',
                key: 'appId',
                sorter: true,
            },
            {
                title: '品牌名称',
                dataIndex: 'appName',
                key: 'appName',
                ellipsis: true,
            },
            {
                title: '一级行业',
                dataIndex: 'appCategory',
                key: 'appCategory',
                ellipsis: true,
            },
            {
                title: '二级行业',
                dataIndex: 'appSubCategory',
                key: 'appSubCategory',
                ellipsis: true,
            },
            {
                title: '品牌是否有效',
                dataIndex: 'status',
                key: 'status',
                ellipsis: true,
            },
            {
                title: 'url是否上传',
                dataIndex: 'upload',
                key: 'upload',
                ellipsis: true,
            },
            {
                title: '最近一次上传时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                ellipsis: true,
                sorter: true,
            },
            {
                title: '上传人',
                dataIndex: 'updateBy',
                key: 'updateBy',
                ellipsis: true,
            },
            {
                title: '创建时间',
                dataIndex: 'updateTime',
                key: 'updateTime1',
                ellipsis: true,
                sorter: true,
            },
            {
                title: '创建人',
                dataIndex: 'updateBy',
                key: 'updateBy1',
                ellipsis: true,
            },
            {
                title: '操作',
                dataIndex: 'action',
                slots: { customRender: 'action' },
            },
        ];
        let data = ref([]);
        let searchDate = {};
        // 搜索赋值方法
        const searchClick = data => {
                searchDate = data;
                if (searchDate.appType) {
                    searchDate.appCategoryCode = searchDate.appType[0];
                    searchDate.appSubCategoryCode = searchDate.appType[1];
                    delete searchDate.appType;
                }
                paginationTotal.page = 1;
                tableList();
            },
            deleteFun = record => {
                console.log(record);
            };
        const selectHttp = () => {
            // 级联下拉请求
            listAppCategory().then(res => {
                const obj = list.value.find(item => item.name === 'appType');
                obj.list = res.result;
            });
        };
        const tableList = () => {
            const httpData = Object.assign(paginationTotal, searchDate);
            // table列表
            appUrlList(httpData).then(res => {
                const { success, result } = res;
                if (success) {
                    data.value = result.records;
                    total = result.total;
                    data.value.forEach(item => {
                        if (item.status) {
                            if (item.status === 1) item.status = '有效';
                            if (item.status === 0) item.status = '无效';
                        } else {
                            item.status = '';
                        }
                        if (item.upload) {
                            if (item.upload === 1) item.upload = '是';
                            if (item.upload === 0) item.upload = '否';
                        } else {
                            item.upload = '';
                        }
                    });
                }
            });
        };
        onMounted(() => {
            selectHttp();
            tableList();
        });
        // table组件参数以及方法
        let total = ref(0);
        const loading = ref(false),
            paginationTotal = reactive({
                page: 1,
                pageSize: 10,
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
            total,
        };
    },
};
</script>
