import { createRouter, createWebHistory } from 'vue-router';
import Home from '../view/home/index.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: { name: 'BasicDataManagement' },
    },
    {
        path: '/basic-data-management',
        name: 'BasicDataManagement',
        meta: {
            menuName: '基础数据管理',
        },
        component: Home,
        children: [
            // 基础shuju管理模块
            {
                path: '/app-admin',
                name: 'appAdming',
                meta: {
                    menuName: 'APP管理',
                },
                component: () => import('../view/BasicDataManagement/appAdmin/index.vue'),
            },
            {
                path: '/brand-admin',
                name: 'brandAdming',
                meta: {
                    menuName: '品牌管理',
                },
                component: () => import('../view/BasicDataManagement/brandAdmin/index.vue'),
            },
            // 大数据管理
            {
                path: '/app-urlcompilations-admin',
                name: 'appUrlcompilationsAdmin',
                meta: {
                    menuName: 'APPurl合集',
                },
                component: () => import('../view/bigDataAdmin/appUrlcompilationsAdmin/index.vue'),
            },
            {
                path: '/brand-urlcompilations-admin',
                name: 'brandUrlcompilationsAdmin',
                meta: {
                    menuName: '品牌url合集',
                },
                component: () => import('../view/bigDataAdmin/brandUrlcompilationsAdmin/index.vue'),
            },
            {
                path: '/else-urlcompilations-admin',
                name: 'elseUrlcompilationsAdmin',
                meta: {
                    menuName: '其他url合集',
                },
                component: () => import('../view/bigDataAdmin/elseUrlcompilationsAdmin/index.vue'),
            },
            {
                path: '/original-data-tem-admin',
                name: 'originalDataTemAdmin',
                meta: {
                    menuName: '原始数据模板管理',
                },
                component: () => import('../view/bigDataAdmin/originalDataTemAdmin/index.vue'),
            },
            {
                path: '/original-data-admin',
                name: 'originalDataAdmin',
                meta: {
                    menuName: '原始数据管理',
                },
                component: () => import('../view/bigDataAdmin/originalDataAdmin/index.vue'),
            },
            {
                path: '/final-data-admin',
                name: 'finalDataAdmin',
                meta: {
                    menuName: '最终数据管理',
                },
                component: () => import('../view/bigDataAdmin/finalDataAdmin/index.vue'),
            },
            {
                path: '/final-data-admin',
                name: 'finalDataAdmin',
                meta: {
                    menuName: '最终数据审核',
                },
                component: () => import('../view/bigDataAdmin/auditDataAdmin/index.vue'),
            },
            // 舆情数据管理
            {
                path: '/Interface-data-monitoring',
                name: 'InterfaceDataMonitoring',
                meta: {
                    menuName: '接口数据监控',
                },
                component: () =>
                    import('../view/popularFeelingsAdmin/InterfaceDataMonitoring/index.vue'),
            },
            {
                path: '/effective-data-monitoring',
                name: 'EffectiveDataMonitoring',
                meta: {
                    menuName: '有效数据监控',
                },
                component: () =>
                    import('../view/popularFeelingsAdmin/EffectiveDataMonitoring/index.vue'),
            },
            {
                path: '/manual-check',
                name: 'manualCheck',
                meta: {
                    menuName: '人工审核',
                },
                component: () => import('../view/popularFeelingsAdmin/manualCheck/index.vue'),
            },
            {
                path: '/manual-check-config',
                name: 'manualCheckConfig',
                meta: {
                    menuName: '人工审核配置',
                },
                component: () => import('../view/popularFeelingsAdmin/manualCheckConfig/index.vue'),
            },
            {
                path: '/custom-keywords',
                name: 'customKeywords',
                meta: {
                    menuName: '自定义关键词管理',
                },
                component: () => import('../view/popularFeelingsAdmin/customKeywords/index.vue'),
            },
            // 系统管理
            {
                path: '/user-management',
                name: 'userManagement',
                meta: {
                    menuName: '用户管理',
                },
                component: () =>
                    import('../view/basicFunction/systemManagement/userManagement/index.vue'),
            },
            {
                path: '/role-management',
                name: 'roleManagement',
                meta: {
                    menuName: '角色管理',
                },
                component: () =>
                    import('../view/basicFunction/systemManagement/roleManagement/index.vue'),
            },
            {
                path: '/menu-management',
                name: 'menuManagement',
                meta: {
                    menuName: '菜单管理',
                },
                component: () =>
                    import('../view/basicFunction/systemManagement/menuManagement/index.vue'),
            },
            // {
            //     path: '/personal-center',
            //     name: 'personalCenter',
            //     meta: {
            //         menuName: '个人中心',
            //     },
            //     component: () => import('../view/basicFunction/personalCenter/index.vue'),
            // },
            // {
            //     path: '/message-center',
            //     name: 'messageCenter',
            //     meta: {
            //         menuName: '消息中心',
            //     },
            //     component: res => require(['../view/basicFunction/messageCenter/index.vue'], res), // 异步组件
            // },
        ],
    },
];

export default createRouter({
    history: createWebHistory(''),
    routes,
});
