import Vue from 'vue'
import Router from "vue-router";
import routes from '@/router/routers'
import store from '@/store'
import vueMeta from 'vue-meta'
import request from '@/services/axios'
import Setting from "@/setting";

Vue.use(Router)
Vue.use(vueMeta, { refreshOnceOnNavigation: true })

const route = new Router({
  base: Setting.apiBaseURL,
  vueMeta,
  routes,
  mode: Setting.routerMode,
  scrollBehavior() {
    return { x:0, y:0}
  },
})

route.beforeEach((to, from, next) =>{
  request.clearPendingPool()
  if(to.matched.some(record => record.meta)) {
    // 处理登录
    console.warn('---router/index---')
    console.warn(store.state.settings)
  }else{
    next()
  }
})
export default route
