<!-- 公共table -->
<template>
    <div style="padding-top: 10px">
        <a-table :columns="columns" :data-source="data">
            <template v-for="(item, index) in slot" :key="index" #[item]="text,record">
                <slot :name="item" :text="text" :record="record"></slot>
            </template>
        </a-table>
    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
    props: {
        columns: Array,
        data: Array,
    },
    setup(props) {
        const arr = props.columns.map(res => res.slots?.customRender);
        const slot = [];
        arr.forEach(res => {
            if (res) slot.push(res);
        });
        onMounted(() => {
            console.log(props.columns);
            console.log(props.data);
        });
        return {
            slot,
        };
    },
});
</script>
