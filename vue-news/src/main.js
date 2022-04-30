import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store/store'
import SIdentify from './components/login/SIdentify/SIdentify' //注意引入路径
import VueKindEditor from './plugin/kindeditor.js'
import '../static/kindeditor/themes/default/default.css'
import '../static/kindeditor/kindeditor-all-min.js'
import '../static/kindeditor/lang/zh-CN.js'
Vue.use(VueKindEditor)
Vue.use(SIdentify)
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
