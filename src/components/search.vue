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
                    />
                    <a-select
                        v-model:value="item.value"
                        style="width: 200px"
                        v-if="item.comp === 'select'"
                    >
                        <a-select-option value="shanghai">Zone one</a-select-option>
                    </a-select>
                    <a-range-picker
                        v-if="item.comp === 'date'"
                        v-model:value="item.value"
                        show-time
                        type="date"
                        placeholder="Pick a date"
                        style="width: 200px"
                    />
                    <!-- 单选框 -->
                    <a-radio-group
                        v-model:value="item.value"
                        style="width: 200px;display:flex"
                        v-if="item.comp === 'radio'"
                    >
                        <a-radio value="1">Sponsor</a-radio>
                        <a-radio value="2">Venue</a-radio>
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
import { defineComponent, onMounted, watch, toRefs } from 'vue';
export default defineComponent({
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
        const data = {};
        const // 点击查询回传的搜索条件
            changeSearch = () => {
                props.list.forEach(item => {
                    data[item.name] = item.value;
                });
                emit('searchClick', data);
            },
            // 重置按钮
            reset = () => {
                props.list.forEach(item => {
                    data[item.name] = item.value;
                });
            };
        console.log(...toRefs(props.list));
        return {
            // toRefs  将reactive   响应式对象  转换为 普通对象   其值 都是指向原来对象的property上    结果还是响应式
            // ...toRefs(props.list),
            changeSearch,
            reset,
        };
    },
});
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
</style>
