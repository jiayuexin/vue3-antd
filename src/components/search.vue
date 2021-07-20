<template>
    <!-- <template> -->
    <div style="padding-bottom: 10px;margin-bottom: 10px;border-bottom: 7px solid #ccc;">
        <div style="display: flex; flex-wrap: wrap">
            <!--  展示自定义筛选字段中被选中的部分-->
            <div v-for="item in list" :key="item.name">
                <div class="search-row">
                    <label>{{ item.label }}:</label>
                    <!-- 下拉框的title部分-->
                    <!-- 下拉框动态组件部分-->
                    <!-- 动态组件本身，没啥事件，此处为CustomizeModal组件抛出的事件-->
                    <a-input
                        v-model:value="item.value"
                        style="width: 200px"
                        v-if="item.comp === 'input'"
                        :placeholder="`请输入${item.label}`"
                    />
                    <a-select
                        v-model:value="item.value"
                        style="width: 200px"
                        v-if="item.comp === 'select'"
                        :placeholder="`请选择${item.label}`"
                    >
                        <a-select-option value="shanghai">Zone one</a-select-option>
                    </a-select>
                    <a-range-picker
                        v-if="item.comp === 'date'"
                        v-model:value="item.value"
                        show-time
                        type="date"
                        style="width: 200px"
                    />
                    <a-cascader
                        v-model:value="item.value"
                        :options="item.list"
                        expand-trigger="hover"
                        :placeholder="`请选择${item.label}`"
                        v-if="item.comp === 'cascader'"
                        style="width: 200px;"
                        popupClassName="scroll"
                    />
                    <!-- 单选框 -->
                    <a-radio-group
                        v-model:value="item.value"
                        style="width: 200px;display:flex"
                        v-if="item.comp === 'radio'"
                    >
                        <a-radio v-for="v in item.list" :value="v.id" :key="v.id">
                            {{ v.name }}
                        </a-radio>
                    </a-radio-group>
                </div>
            </div>
        </div>
        <div class="btn-bar" style="text-align: right; margin-right: 5px; margin-top: 7px">
            <a-button type="primary" @click="changeSearch" style="margin-right: 10px">
                查询
            </a-button>
            <a-button type="primary" @click="reset">重置</a-button>
        </div>
    </div>
</template>
<script>
import { onMounted, watch } from 'vue';
import moment from 'moment';
export default {
    props: {
        list: Array,
    },
    // emit  是子传父时要用的方法,和 this.$emit 一样
    setup(props, { emit }) {
        // 用来接收父组件的值
        // inject('list');
        onMounted(() => {
            console.log(props, 'prop');
        });
        watch(
            () => props.list,
            (newVal, oldVal) => {
                console.log(newVal, oldVal, props.list);
            }
        );
        const displayRender = labels => {
            return labels[labels.length - 1];
        };
        const data = {};
        const // 点击查询回传的搜索条件
            changeSearch = () => {
                props.list.forEach(item => {
                    if (Array.isArray(item.value) && item.value.length) {
                        if (item.comp === 'date') {
                            data[`start${item.name}`] = moment(item.value[0]).format('YYYY-MM-DD');
                            data[`end${item.name}`] = moment(item.value[1]).format('YYYY-MM-DD');
                        } else if (item.comp !== 'date') {
                            data[item.name] = item.value;
                        }
                    } else if (typeof item.value !== 'object' && item.value) {
                        data[item.name] = item.value;
                    }
                });
                emit('searchClick', data);
            },
            // 重置按钮
            reset = () => {
                props.list.forEach(item => {
                    if (item.comp === 'input' || item.comp === 'radio') {
                        item.value = '';
                    } else if (item.comp === 'data') {
                        item.value = null;
                    } else if (item.comp === 'cascader') {
                        item.value = [];
                    } else if (item.comp === 'select') {
                        item.value = undefined;
                    }
                });
            };
        return {
            // toRefs  将reactive   响应式对象  转换为 普通对象   其值 都是指向原来对象的property上    结果还是响应式
            // ...toRefs(props.list),
            changeSearch,
            reset,
            displayRender,
        };
    },
};
</script>
<style lang="less">
.search-row {
    padding: 3px 10px;
    font-size: 12px;
    display: flex;

    a {
        padding: 4px 13px;
        display: inline-block;
        color: #666;
        margin: 5px 5px 5px 0;
        font-size: 13px;
    }
    a.active {
        color: #0b73df;
        background: #deefff;
    }
    label {
        width: 130px;
        padding-right: 0;
        margin-bottom: 0;
        line-height: 30px;
        font-size: 13px;
        color: #666;
        display: inline-block;
        max-width: 100%;
        text-align: right;
        margin-right: 5px;
    }
    .label {
        width: 150px;
        padding-right: 0;
        margin-bottom: 0;
        line-height: 30px;
        font-size: 13px;
        color: #666;
        display: inline-block;
        max-width: 100%;
        text-align: right;
    }
}
/*修改滚动条样式*/
.scroll {
    ::-webkit-scrollbar {
        width: 3px;
        /**/
    }
    ::-webkit-scrollbar-track {
        background: rgb(247, 247, 247);
        border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb {
        background: #e4e4e4;
        border-radius: 8px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #d6d6d6;
        cursor: pointer;
    }
    ::-webkit-scrollbar-corner {
        background: #d6d6d6;
        border-radius: 0px;
    }
}
</style>
