<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="logo">
                <img src="../../assets/logo.png" alt="" />
            </div>
            <a-menu
                theme="dark"
                mode="inline"
                v-model:selectedKeys="selectedKeys"
                @click="jumpRouter"
            >
                <template v-for="item in menu">
                    <a-sub-menu v-if="item.meta" :key="item.path">
                        <template #title>
                            <span>{{ item.meta.menuName }}</span>
                        </template>
                        <template v-if="item.children">
                            <template v-for="v in item.children">
                                <a-sub-menu v-if="v.children" :key="v.path">
                                    <template #title>
                                        <span>{{ v.meta.menuName }}</span>
                                    </template>
                                    <a-menu-item v-for="m in v.children" :key="m.path">
                                        {{ m.meta.menuName }}
                                    </a-menu-item>
                                </a-sub-menu>
                                <a-menu-item :key="v.path" v-else>
                                    {{ v.meta.menuName }}
                                </a-menu-item>
                            </template>
                        </template>
                    </a-sub-menu>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0;padding-left: 20px">
                <menu-unfold-outlined
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    class="trigger"
                    @click="() => (collapsed = !collapsed)"
                />
            </a-layout-header>
            <a-layout-content
                :style="{
                    padding: '10px',
                    height: 'calc(100vh - 75px)',
                    overflowY: 'auto',
                    margin: '5px 10px',
                    background: '#fff',
                    borderRadius: '10px',
                }"
            >
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
// import // UserOutlined,
// VideoCameraOutlined,
// UploadOutlined,
// MenuUnfoldOutlined,
// MenuFoldOutlined,
// '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
    components: {
        // UserOutlined,
        // VideoCameraOutlined,
        // UploadOutlined,
        // MenuUnfoldOutlined,
        // MenuFoldOutlined,
    },
    setup() {
        const router = useRouter();
        const menu = [
            {
                path: '/basic-data-management',
                name: 'BasicDataManagement',
                meta: {
                    menuName: '基础数据管理',
                },
                children: [
                    {
                        path: '/app-admin',
                        name: 'appAdming',
                        meta: {
                            menuName: 'APP管理',
                        },
                    },
                    {
                        path: '/brand-admin',
                        name: 'brandAdming',
                        meta: {
                            menuName: '品牌管理',
                        },
                    },
                ],
            },
            {
                path: '/big-data-admin',
                name: 'bigDataAdmin',
                meta: {
                    menuName: '大数据管理',
                },
                children: [
                    {
                        path: '/app-urlcompilations-admin',
                        name: 'appUrlcompilationsAdmin',
                        meta: {
                            menuName: 'APPurl合集',
                        },
                    },
                    {
                        path: '/brand-urlcompilations-admin',
                        name: 'brandUrlcompilationsAdmin',
                        meta: {
                            menuName: '品牌url合集',
                        },
                    },
                    {
                        path: '/else-urlcompilations-admin',
                        name: 'elseUrlcompilationsAdmin',
                        meta: {
                            menuName: '其他url合集',
                        },
                    },
                    {
                        path: '/original-data-tem-admin',
                        name: 'originalDataTemAdmin',
                        meta: {
                            menuName: '原始数据模板管理',
                        },
                    },
                    {
                        path: '/original-data-admin',
                        name: 'originalDataAdmin',
                        meta: {
                            menuName: '原始数据管理',
                        },
                    },
                    {
                        path: '/final-data-admin',
                        name: 'finalDataAdmin',
                        meta: {
                            menuName: '最终数据管理',
                        },
                    },
                    {
                        path: '/final-data-admin',
                        name: 'finalDataAdmin',
                        meta: {
                            menuName: '最终数据审核',
                        },
                    },
                ],
            },
            {
                path: '/popular-feelings-admin',
                name: 'popularFeelingsAdmin',
                meta: {
                    menuName: '舆情管理',
                },
                children: [
                    {
                        path: '/Interface-data-monitoring',
                        name: 'InterfaceDataMonitoring',
                        meta: {
                            menuName: '接口数据监控',
                        },
                    },
                    {
                        path: '/effective-data-monitoring',
                        name: 'EffectiveDataMonitoring',
                        meta: {
                            menuName: '有效数据监控',
                        },
                    },
                    {
                        path: '/manual-check',
                        name: 'manualCheck',
                        meta: {
                            menuName: '人工审核',
                        },
                    },
                    {
                        path: '/manual-check-config',
                        name: 'manualCheckConfig',
                        meta: {
                            menuName: '人工审核配置',
                        },
                    },
                    {
                        path: '/custom-keywords',
                        name: 'customKeywords',
                        meta: {
                            menuName: '自定义关键词管理',
                        },
                    },
                ],
            },
            {
                path: '/basic-function',
                name: 'basicFunction',
                meta: {
                    menuName: '基础功能',
                },
                children: [
                    {
                        path: '/system-management',
                        name: 'systemManagement',
                        meta: {
                            menuName: '系统管理',
                        },
                        children: [
                            {
                                path: '/user-management',
                                name: 'userManagement',
                                meta: {
                                    menuName: '用户管理',
                                },
                            },
                            {
                                path: '/role-management',
                                name: 'roleManagement',
                                meta: {
                                    menuName: '角色管理',
                                },
                            },
                            {
                                path: '/menu-management',
                                name: 'menuManagement',
                                meta: {
                                    menuName: '菜单管理',
                                },
                            },
                        ],
                    },
                    {
                        path: '/personal-center',
                        name: 'personalCenter',
                        meta: {
                            menuName: '个人中心',
                        },
                    },
                    {
                        path: '/message-center',
                        name: 'messageCenter',
                        meta: {
                            menuName: '消息中心',
                        },
                    },
                ],
            },
        ];
        onMounted(() => {
            console.log(router);
            console.log(process.env);
        });
        const jumpRouter = path => {
            console.log(path);
            router.push({ path: path.key });
        };
        return {
            menu,
            selectedKeys: ref(['1']),
            collapsed: ref(false),
            jumpRouter,
        };
    },
});
</script>
<style>
@import '../../styles/common.css';
</style>
