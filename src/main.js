// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import ElementUI from 'element-ui'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/icon.css'
import './assets/css/reset.css'
import axios from 'axios'

import 'babel-polyfill'
import VueI18n from 'vue-i18n'

Vue.prototype.$http = axios
axios.defaults.withCredentials = true
Vue.use(ElementUI)
// Vue.use(Vuex)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: sessionStorage.getItem('encn') === '0' ? 'en-US' : 'zh-CN',
  messages: {
    'zh-CN': require('./common/lang/zh'), // 中文语言包
    'en-US': require('./common/lang/en') // 英文语言包
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  // store,
  components: { App },
  template: '<App/>'
})
