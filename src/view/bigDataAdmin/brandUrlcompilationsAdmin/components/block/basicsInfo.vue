<template>
    <a-form ref="formRef" :model="formState" :rules="rules">
        <div style="padding: 10px">
            <a-row :gutter="20">
                <a-col :span="6" v-if="title === '编辑'">
                    <a-form-item label="url合集ID" name="name">
                        <a-input v-model:value="formState.name" style="width: 180px" disabled />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="品牌名称" name="name">
                        <a-auto-complete
                            v-model:value="formState.name"
                            placement="bottom"
                            @search="onSearch"
                        >
                            <template #dataSource>
                                <a-select-option
                                    v-for="item in getBrandSelect"
                                    :value="item.brandName"
                                    :key="item.brandId"
                                >
                                    {{ item.brandName }}
                                </a-select-option>
                            </template>
                        </a-auto-complete>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item ref="entityId" label="品牌ID" name="entityId">
                        <a-input v-model:value="formState.entityId" style="width: 180px" disabled />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="品牌是否有效">
                        <a-select v-model:value="noFormState.status" style="width: 165px" disabled>
                            <a-select-option :value="0">否</a-select-option>
                            <a-select-option :value="1">是</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="品牌行业">
                        <a-input v-model:value="noFormState.brand" style="width: 180px" disabled />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="10">
                    <a-form-item
                        label="备注"
                        name="memo"
                        :style="title === '新增' ? 'margin-left: 38px' : 'margin-left: 28px'"
                    >
                        <a-textarea
                            v-model:value="formState.memo"
                            placeholder="请填写备注"
                            :rows="2"
                            :maxlength="100"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
        </div>
    </a-form>
</template>
<script>
import { defineComponent, reactive, ref, toRaw, onMounted } from 'vue';
import { listChannelType, getBrandVO } from '@/api/index';
export default defineComponent({
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        //   用于表单绑定ref
        const formRef = ref();
        // 需要传给后端的数据
        const formState = reactive({
            name: '',
            entityId: '',
            memo: '',
        });
        // 不需要传后端的数据
        const noFormState = reactive({
            brand: '',
            status: '',
        });
        const loading = ref(false);
        const rules = {
            name: [
                {
                    required: props.title === '新增' ? true : false,
                    message: '请输入品牌名称',
                    trigger: 'blur',
                },
            ],
        };
        // 防抖是  在n秒内重复执行   会重新计算时间
        // 节流是   在n秒内只执行一次
        let timer = null;
        const onSearch = search => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                getBrand(search);
            }, 1000);
        };
        const onSubmit = () => {
            formRef.value
                .validate()
                .then(() => {
                    console.log('values', formState, toRaw(formState));
                })
                .catch(error => {
                    console.log('error', error);
                });
        };
        const getBrandSelect = ref([]);
        const getBrand = name => {
            getBrandVO(name).then(res => {
                getBrandSelect.value = res.result;
            });
        };
        const resetForm = () => {
            formRef.value.resetFields();
        };
        const select = ref([]);
        const listHttp = () => {
            listChannelType().then(res => {
                select.value = res.result;
            });
        };
        onMounted(() => {
            listHttp();
            getBrand();
        });
        return {
            formRef,
            other: '',
            formState,
            rules,
            onSubmit,
            resetForm,
            select,
            loading,
            onSearch,
            getBrandSelect,
            noFormState,
        };
    },
});
</script>
