import Vue from 'vue'

import NProgress from 'vue-nprogress'

import App from './App.vue'
import router from '@/router'
import store from '@/store'
import { i18n } from '@/localization'
import config from '@/config'
import VueLazyLoad from 'vue-lazyload'
import '@/plugins/ant-design-vue'

import '@/plugins/registerServiceWorker'

import 'ant-design-vue/dist/antd.less'
import '@/antd-variables.less'

Vue.use(NProgress)
const nprogress = new NProgress( {
  parent: 'body',
  template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
})

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: require('./assets/images/no.png'),
  loading: require('./assets/images/moren.jpg'),
  attempt: 1,
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'],
})

Vue.prototype.$config = config

Vue.config.productionTip = false

new Vue({
  nprogress,
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
