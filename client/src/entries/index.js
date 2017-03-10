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
import VueSocketIo from 'vue-socket.io'

require('es6-promise').polyfill();

Vue.use(Element);
Vue.use(VueRouter);
Vue.use(VueFetch);
Vue.use(VueSocketIo, '/server');

const routes = [{
  path: '/1',
  component: require('../pages/home/first.vue'),
  name: 'first',
  alias: '/'
}, {
  path: '/2',
  component: require('../pages/home/second.vue'),
  name: 'second'
},
  {
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