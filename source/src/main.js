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
import VueModal from 'vue-js-modal'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import App from './App'
import router from './router'
import DatePicker from 'vue2-datepicker'
import DownloadJS from 'downloadjs'
import SimpleVueValidation from 'simple-vue-validator';
import Timeselector from 'vue-timeselector';
import { ButtonPlugin, ButtonGroupPlugin, ModalPlugin } from 'bootstrap-vue';
import { vsButton, vsSelect, vsPopup, vsChip, vsIcon } from 'vuesax';
import StarRating from 'vue-star-rating';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'expose-loader?$!expose-loader?jQuery!jquery';
import './assets/js/bootstrap.min.js';
import './assets/js/jquery.nav.min.js';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';

//DataTables
import './assets/datatables/js/jquery.dataTables.min.js';
import './assets/datatables/dataTables.bootstrap.js';
import './assets/datatables/tabletools/dataTables.tableTools.min.js';
import './assets/datatables/fnReloadAjax.js';


Vue.prototype.$http = axios;
Vue.prototype.$download = DownloadJS;

Vue.prototype.$validator = SimpleVueValidation.Validator;

// todo
// cssVars()
Vue.use(DatePicker);
Vue.use(BootstrapVue);
Vue.use(VueSession);
Vue.use(VueHead);
Vue.use(VueModal);
Vue.use(SimpleVueValidation);
Vue.use(Timeselector);
Vue.use(ButtonPlugin);
Vue.use(vsButton);
Vue.use(vsSelect);
Vue.use(vsPopup);
Vue.use(vsChip);
Vue.use(vsIcon);
Vue.use(ButtonGroupPlugin);
Vue.use(StarRating);
Vue.use(ModalPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})