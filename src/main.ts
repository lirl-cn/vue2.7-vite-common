import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, { MessageBox } from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN'
import * as Antd from 'ant-design-vue';
import moment from 'moment';
import request from '@/utils/request'
import 'moment/dist/locale/zh-cn';
moment.locale('zh-cn');

// 引入 ant-design-vue 样式
import 'ant-design-vue/dist/antd.less';
// 引入element UI 样式
import '@/styles/element-variables.scss';
// import 'element-ui/lib/theme-chalk/index.css';
// 项目全局样式
import '@/styles/global.scss';
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'  // codemirror样式
import 'codemirror/mode/javascript/javascript.js' // codemirror样式

import { setInfo, isHasAuth, clearToken, getToken, getInfo } from '@/utils/auth'


Vue.use(ElementUI, locale);
Vue.use(Antd);
Vue.use(VueCodeMirror)


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
