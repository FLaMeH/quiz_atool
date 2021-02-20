import Vue from 'vue'
import Router from "vue-router";
import routes from '@/router/routers'
// import store from '@/store'
import vueMeta from 'vue-meta'
import request from '@/services/axios'
import Setting from "@/setting"
import Cookies from 'js-cookie'

Vue.use(Router)
Vue.use(vueMeta, { refreshOnceOnNavigation: true })

const route = new Router({
  vueMeta,
  routes,
  mode: Setting.routerMode,
})

route.beforeEach((to, from, next) =>{
  request.clearPendingPool()
    // 处理登录
    if(to.matched.some(_ => _.meta.auth)){
      const token = Cookies.get('token')
      console.log(token)
      if (token && token !== undefined) {
//         if(store.state.auth){}
      }else{
        localStorage.clear()
        Cookies.remove('token')
        Cookies.remove('expires_time')
        Cookies.remove('uuid')
        console.log('ok')
        next({
          name: 'login',
          query: {
            redirect: to.fullPath,
          },
        })
      }
  }else{
    next()
  }
})
export default route
