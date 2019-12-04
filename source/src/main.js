import 'babel-polyfill';
import 'event-source-polyfill';
import "isomorphic-fetch";

import 'core-js/es6/promise';
import 'core-js/es6/string';
import 'core-js/es7/array';

import './plugins/socketPlugin';

// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue';
import VueSession from 'vue-session';
import VueHead from 'vue-head';
import VueModal from 'vue-js-modal';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import DatePicker from 'vue2-datepicker';
import DownloadJS from 'downloadjs';
import SimpleVueValidation from 'simple-vue-validator';
import Timeselector from 'vue-timeselector';
import ButtonPlugin from 'bootstrap-vue';
import Vuesax from 'vuesax';

import App from './App';
import router from './router';
import Directives from './plugins/directives';



import 'expose-loader?$!expose-loader?jQuery!jquery';
import './assets/js/bootstrap.min.js';
import './assets/js/jquery.nav.min.js';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import './assets/_common.scss';

//DataTables
import './assets/datatables/js/jquery.dataTables.min.js';
import './assets/datatables/dataTables.bootstrap.js';
import './assets/datatables/tabletools/dataTables.tableTools.min.js';
import './assets/datatables/fnReloadAjax.js';

import './plugins/socketPlugin';

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
Vue.use(Vuesax);


Vue.config.productionTip = false;
Vue.use(Directives);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})