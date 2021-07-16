import { createStore } from 'vuex';
import getters from './getters';
export default createStore({
    // 仓库状态
    state: {},
    // 同步触发方法
    mutations: {},
    // 异步触发方法
    actions: {},
    // 模块化配置
    modules: {},
    // 响应式数据源
    getters,
});
