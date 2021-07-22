<template>
    <a-form ref="formRef" :model="formState" :rules="rules">
        <div style="padding: 10px">
            <a-row :gutter="20">
                <a-col :span="6" v-if="title === '编辑'">
                    <a-form-item label="品牌名称" name="name">
                        <a-input v-model:value="formState.name" style="width: 180px" disabled />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="品牌名称" name="name">
                        <a-input
                            v-model:value="formState.name"
                            style="width: 180px"
                            :disabled="title === '编辑'"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item ref="entityId" label="品牌ID" name="entityId">
                        <a-input v-model:value="formState.entityId" style="width: 180px" disabled />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="品牌是否有效" name="region">
                        <a-select v-model:value="formState.desc" style="width: 165px" disabled>
                            <a-select-option :value="0">否</a-select-option>
                            <a-select-option :value="1">是</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="品牌行业" name="appendixUrl">
                        <a-cascader
                            v-model:value="formState.appendixUrl"
                            :options="select"
                            expand-trigger="hover"
                            style="width: 180px;"
                            popupClassName="scroll"
                            disabled
                        />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="12">
                <a-col :span="10">
                    <a-form-item
                        label="备注"
                        name="memo"
                        :style="title === '新增' ? 'margin-left: 38px' : 'margin-left: 30px'"
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
import { listChannelType } from '@/api/index';
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
        const formState = reactive({
            name: '',
            entityId: undefined,
            appendixUrl: [],
            desc: '',
            memo: '',
        });
        const rules = {
            name: [
                {
                    required: props.title === '新增' ? true : false,
                    message: '请输入品牌名称',
                    trigger: 'blur',
                },
            ],
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
        });
        return {
            formRef,
            other: '',
            formState,
            rules,
            onSubmit,
            resetForm,
            select,
        };
    },
});
</script>
