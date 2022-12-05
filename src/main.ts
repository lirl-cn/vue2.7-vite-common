import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CnV2C from "@lirl-cn/v2c"; // 基于element UI 
import * as Antd from 'ant-design-vue';
import { MessageBox } from 'element-ui';
import moment from 'moment';
import request from '@/utils/request'
import 'moment/dist/locale/zh-cn';
moment.locale('zh-cn');

// 引入 ant-design-vue 样式
import 'ant-design-vue/dist/antd.less';

// 引入element UI 样式 基于@lirl-cn/v2c
import '@/styles/element-variables.scss'; // 修改主题
// import "@lirl-cn/v2c/es/style.css";  // 默认主题

// 项目全局样式
import '@/styles/global.scss';
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'  // codemirror样式
import 'codemirror/mode/javascript/javascript.js' // codemirror样式

import { setInfo, isHasAuth, clearToken, getToken, getInfo } from '@/utils/auth'

// 注册v2c，v2c内置了所有element UI组件
Vue.use(CnV2C, {
  table: {
    // 挂载全局一些公共方法，可以避免每个页面使用时配置
    request, // 当定义了request后，cn-table可以直接仅传action字段，内部会调用该方法去获取数据
  },
});

Vue.use(Antd);
Vue.use(VueCodeMirror)

console.log('main.ts', MessageBox);
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$aConfirm = Antd.Modal.confirm
Vue.prototype.$setCurrentInfo = setInfo
Vue.prototype.$getCurrentInfo = getInfo
Vue.prototype.$moment = moment
Vue.prototype.$request = request
Vue.prototype.$getToken = getToken
Vue.prototype.$getCompanyName = () => {
  return store.state?.company?.info?.enterpriseName
}
Vue.prototype.$isHasAuth = function () {
  const isLogin = isHasAuth();
  if (!isLogin) {
    clearToken(false);
    this.$store.commit('company/updateInfo', {})
  }
  return isLogin
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
