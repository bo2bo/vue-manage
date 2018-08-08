// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'
import axios from 'axios'
import $ from "jquery"
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'

Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.crossDomain = true;
axios.defaults.withCredentials=true;

Vue.prototype.$axios = axios;
Vue.prototype.$jquery = $;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
