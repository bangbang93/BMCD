/**
 * Created by bangbang93 on 16/9/30.
 */
'use strict';
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from '../pages/login.vue'
import VueFetch from 'vue-fetch'

require('es6-promise').polyfill();

Vue.use(Element);
Vue.use(VueFetch);

const app = new Vue({
  render: (h)=>h(App),
}).$mount('app');