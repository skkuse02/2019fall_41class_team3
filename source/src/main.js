import 'babel-polyfill'
import 'event-source-polyfill'
import "isomorphic-fetch";

import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import VueSession from 'vue-session'
import VueHead from 'vue-head'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import App from './App'
import router from './router'
import DatePicker from 'vue2-datepicker'
import DownloadJS from 'downloadjs'
import VueSelect from 'vue-cool-select'
import VModal from 'vue-js-modal'

import 'formdata-polyfill'
import { isMobile } from 'mobile-device-detect';

axios.defaults.headers.common['Pragma'] = 'no-cache';
Vue.prototype.$http = axios
window.axios = axios
Vue.prototype.$download = DownloadJS

Vue.use(BootstrapVue)
Vue.use(VueSession, {
  persist: true
})
Vue.use(VueHead)
Vue.use(VueSelect, { theme: 'bootstrap' })
Vue.use(VModal, { dynamic: true })



/* eslint-disable no-new */
new Vue({
  created() {

  },
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
