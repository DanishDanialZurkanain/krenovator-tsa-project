import Vue from 'vue'
import VueSession from 'vue-session'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import axios from 'axios'

import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var options = {
  persist: true
}

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSession, options)

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
