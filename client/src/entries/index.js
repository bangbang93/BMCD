/**
 * Created by bangbang93 on 16/9/30.
 */
'use strict';
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from '../pages/index.vue'
import VueRouter from 'vue-router'
import VueFetch from 'vue-fetch'

require('es6-promise').polyfill();

Vue.use(Element);
Vue.use(VueRouter);
Vue.use(VueFetch);

const routes = [{
  path: '/',
  component: require('../pages/dashboard.vue'),
  name: 'index',
}, {
  path: '/server',
  component: require('../pages/home/second.vue'),
  name: 'server.list'
}, {
  path: '/server/add',
  component: require('../pages/server/add.vue'),
  name: 'server.add'
}, {
    path: '*',
    redirect: '/'
}];

const router = new VueRouter({
  routes,
  mode: 'history',
  base: '/',
});

const app = new Vue({
  router,
  render: (h)=>h(App),
}).$mount('app');