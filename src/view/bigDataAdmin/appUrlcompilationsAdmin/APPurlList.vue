<!-- appurl列表 -->
<template>
    <div>
        <SearchCom :list="list" @searchClick="searchClick"></SearchCom>
        <a-button type="primary">导出全量url</a-button>
        <Table
            :data="data"
            :columns="columns"
            :loading="loading"
            :total="total"
            :paginationTotal="paginationTotal"
            @changeTable="changeTable"
            :size="'small'"
            :rowSelection="rowSelection"
        >
            <template #action="{record}">
                <a-button type="link" @click="deleteFun(record)">点击</a-button>
            </template>
        </Table>
    </div>
</template>

<script>
import { provide, ref, onMounted, unref } from 'vue';
import SearchCom from '@/components/search';
import Table from '@/components/table';
import { listAppCategory, appUrlList } from '@/api/index';
import moment from 'moment';
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
                sorter: true,
                ellipsis: true,
            },
            {
                title: '品牌ID',
                dataIndex: 'appId',
                key: 'appId',
                sorter: true,
                ellipsis: true,
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
                if (searchDate.Time) {
                    searchDate['startTime'] = moment(searchDate.Time[0]).format('YYYY-MM-DD');
                    searchDate['endTime'] = moment(searchDate.Time[1]).format('YYYY-MM-DD');
                    delete searchDate.Time;
                }
                paginationTotal.value.pageNo = 1;
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
            const httpData = { ...unref(paginationTotal), ...searchDate, ...sort };
            // table列表
            loading.value = true;
            appUrlList(httpData).then(res => {
                loading.value = false;
                const { success, result } = res;
                if (success) {
                    data.value = result.records;
                    total.value = result.total;
                    data.value.forEach(item => {
                        if (item.status || item.status === 0) {
                            if (item.status === 1) item.status = '有效';
                            if (item.status === 0) item.status = '无效';
                        } else {
                            item.status = '';
                        }
                        if (item.upload || item.upload === 0) {
                            if (item.upload === 1) item.upload = '是';
                            if (item.upload === 0) item.upload = '否';
                        } else {
                            item.upload = '';
                        }
                        // 后期手动加入的,用做table id 唯一化,   方法有很多,我这种很鸡肋,但是挺好用
                        item.id = item.urlCollectionId;
                    });
                }
            });
        };
        const rowSelection = {
            // 在select 发生改变时的回调
            onChange: (selectedRowKeys, selectedRows) => {
                // selectedRowKeys  是点击操作过的合集id
                // selectedRows  是当前页  点过select 的合集数据
                // 这个地方就是根据  接口请求  点击拿到的id     ,当我点击到下一页在进行勾选时   selectedRows   就完全不够看了,无法记录上一页勾选的数据
                console.log(selectedRowKeys, selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                // record 没行的数据
                // selected  是否勾选此行
                // selectedRows   在每页勾选的合集  是一个数组
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                // selected全选按钮是否点击
                // selectedRows   点击全选勾选的全部数据
                // changeRows 点击全选,只勾选了没有被选中的数据
                console.log(selected, selectedRows, changeRows);
            },
        };
        onMounted(() => {
            selectHttp();
            tableList();
        });
        // table组件参数以及方法
        let sort = {}, // 排序方法
            total = ref(0);
        const loading = ref(false),
            paginationTotal = ref({
                pageNo: 1,
                pageSize: 10,
            }),
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
                // pagination
                // filters
                // sorter
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
            rowSelection,
        };
    },
};
</script>
