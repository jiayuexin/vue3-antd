<!-- 品牌url列表 -->
<template>
    <div>
        <Search :list="list" @searchClick="searchClick"></Search>
        <AddEditDatail title="新增">
            <a-button type="primary">
                新增品牌url合集
            </a-button>
        </AddEditDatail>

        <Table
            :data="data"
            :columns="columns"
            :paginationTotal="paginationTotal"
            :total="total"
            :loading="loading"
            @changeTable="changeTable"
            size="small"
        >
            <template #action="{record}">
                <div class="setButtonPadding">
                    <a-button size="samll" type="link" @click="detail(record)">详情</a-button>
                    <AddEditDatail title="编辑">
                        <a-button size="samll" type="link" @click="edit(record)">编辑</a-button>
                    </AddEditDatail>
                    <a-button type="link" @click="exportFun(record)">导出</a-button>
                    <a-button type="link" @click="deleteFun(record)">删除</a-button>
                </div>
            </template>
        </Table>
    </div>
</template>
<script>
import { ref, onMounted, unref } from 'vue';
import Search from '@/components/search.vue';
import Table from '@/components/table.vue';
import { listChannelType, brandUrlList } from '@/api/index';
import AddEditDatail from './components/addEditDetail.vue';
import moment from 'moment';
export default {
    components: {
        Search,
        Table,
        AddEditDatail,
    },
    setup() {
        const list = ref([
            {
                label: 'url合集ID',
                name: 'urlCollectionId', //字段名
                value: '',
                comp: 'input', //组件名称
            },
            {
                label: '品牌名称',
                name: 'brandName', //字段名
                value: '',
                comp: 'input', //组件名称
            },
            {
                label: '品牌ID',
                name: 'brandId', //字段名
                value: '',
                comp: 'input', //组件名称
            },
            {
                label: '品牌行业',
                name: 'appType', //字段名
                value: [],
                list: [],
                comp: 'cascader', //组件名称
            },
            {
                label: '最近一次上传时间',
                name: 'update', //字段名
                value: null,
                comp: 'date', //组件名称
            },
            {
                label: '上传人',
                name: 'updateBy', //字段名
                value: '',
                comp: 'input', //组件名称
            },
            {
                label: '品牌是否有效',
                name: 'status', //字段名
                value: '',
                list: [
                    {
                        id: 1,
                        name: '是',
                    },
                    {
                        id: 0,
                        name: '否',
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
                        id: 1,
                        name: '是',
                    },
                    {
                        id: 0,
                        name: '否',
                    },
                ],
                comp: 'radio', //组件名称
            },
            {
                label: '创建时间',
                name: 'created', //字段名
                value: null,
                comp: 'date', //组件名称
            },
            {
                label: '创建人',
                name: 'crateBy', //字段名
                value: '',
                comp: 'input', //组件名称
            },
        ]);
        const columns = [
                {
                    title: 'url合集ID',
                    dataIndex: 'urlCollectionId',
                    key: 'urlCollectionId',
                    ellipsis: true,
                    sorter: true,
                    align: 'center',
                },
                {
                    title: '品牌ID',
                    dataIndex: 'brandId',
                    key: 'brandId',
                    sorter: true,
                    ellipsis: true,
                    align: 'center',
                },
                {
                    title: '品牌名称',
                    dataIndex: 'brandName',
                    key: 'brandName',
                    ellipsis: true,
                    align: 'center',
                },
                {
                    title: '一级行业',
                    dataIndex: 'industryCategory',
                    key: 'industryCategory',
                    ellipsis: true,
                    align: 'center',
                },
                {
                    title: '二级行业',
                    dataIndex: 'industrySubCategory',
                    key: 'industrySubCategory',
                    ellipsis: true,
                    align: 'center',
                },
                {
                    title: '品牌是否有效',
                    dataIndex: 'status',
                    key: 'status',
                    ellipsis: true,
                    align: 'center',
                },
                {
                    title: 'url是否上传',
                    dataIndex: 'upload',
                    key: 'upload',
                    ellipsis: true,
                    align: 'center',
                },
                {
                    title: '最近一次上传时间',
                    dataIndex: 'updateTime',
                    key: 'updateTime',
                    sorter: true,
                    ellipsis: true,
                    width: 150,
                    align: 'center',
                },
                {
                    title: '上传人',
                    dataIndex: 'updateBy',
                    key: 'updateBy',
                    ellipsis: true,
                    align: 'center',
                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                    ellipsis: true,
                    align: 'center',
                },
                {
                    title: '创建人',
                    dataIndex: 'createBy',
                    key: 'createBy',
                    ellipsis: true,
                    align: 'center',
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    width: 200,
                    align: 'center',
                    slots: { customRender: 'action' },
                },
            ],
            paginationTotal = ref({
                pageTo: 1,
                pageSize: 10,
            });
        let loading = ref(false),
            total = ref(0),
            searchDate = {},
            data = ref([]),
            sort = {};
        const searchClick = data => {
                searchDate = data;
                if (searchDate.appType) {
                    searchDate.appCategoryCode = searchDate.appType[0];
                    searchDate.appSubCategoryCode = searchDate.appType[1];
                    delete searchDate.appType;
                }
                if (searchDate.created) {
                    searchDate['createStartTime'] = moment(searchDate.created[0]).format(
                        'YYYY-MM-DD'
                    );
                    searchDate['createEndTime'] = moment(searchDate.created[1]).format(
                        'YYYY-MM-DD'
                    );
                    delete searchDate.created;
                }
                if (searchDate.update) {
                    searchDate['updateStartTime'] = moment(searchDate.update[0]).format(
                        'YYYY-MM-DD'
                    );
                    searchDate['updateEndTime'] = moment(searchDate.update[1]).format('YYYY-MM-DD');
                    delete searchDate.update;
                }
                console.log(searchDate);
                tableList();
            },
            changeTable = data => {
                paginationTotal.value.pageNo = data.pagination.current;
                paginationTotal.value.pageSize = data.pagination.pageSize;
                if (data.sorter.order) {
                    if (data.sorter.field === 'urlCollectionId') {
                        sort.sort = 'id';
                    } else if (data.sorter.field === 'updateTime') {
                        sort.sort = 'update_time';
                    } else {
                        sort.sort = data.sorter.field;
                    }
                    sort.orderBy = data.sorter.order === 'ascend' ? 'ASC' : 'DESC';
                } else {
                    sort = {};
                }
                tableList();
            };
        const listHttp = () => {
            listChannelType().then(res => {
                const obj = list.value.find(item => item.name === 'appType');
                obj.list = res.result;
            });
        };
        const tableList = () => {
            const httpData = { ...unref(paginationTotal), ...searchDate, ...sort };
            loading.value = true;
            brandUrlList(httpData).then(res => {
                loading.value = false;
                const { success, result } = res;
                if (success) {
                    data.value = result.records;
                    total.value = result.total;
                    data.value.forEach(item => {
                        if (item.status || item.status === 0) {
                            if (item.status === 1) item.status = '是';
                            if (item.status === 0) item.status = '否';
                        } else {
                            item.status = '';
                        }
                        if (item.upload || item.upload === 0) {
                            if (item.upload === 1) item.upload = '是';
                            if (item.upload === 0) item.upload = '否';
                        } else {
                            item.upload = '';
                        }
                        item.id = item.urlCollectionId;
                    });
                }
            });
        };
        // 表格操作
        const edit = record => {
                console.log(record);
            },
            deleteFun = record => {
                console.log(record);
            },
            detail = record => {
                console.log(record);
            },
            exportFun = record => {
                console.log(record);
            };
        onMounted(() => {
            listHttp();
            tableList();
        });
        return {
            // 搜索组件的参数及方法
            list,
            searchClick,
            // 表格组件的方法以及参数
            columns,
            data,
            loading,
            total,
            paginationTotal,
            changeTable,
            // 表格每行的操作方法
            edit,
            deleteFun,
            detail,
            exportFun,
        };
    },
};
</script>
<style lang="less">
.setButtonPadding {
    display: flex;
    justify-content: space-between;
    .ant-btn {
        padding: 0 5px !important;
    }
}
</style>
