import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)

Vue.config.productionTip = false

import http from "./request/index"

Vue.prototype.$http = http


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
