import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

import settings from '@/store/modules/setting'
import auth from '@/router/modules/auth'

import Cookies from 'js-cookie'

const ls = new SecureLS({
  isCompression: false,
})

const securedPersist = createPersistedState({
  key: 'secured_persist',
  storage: {
    getItem: key => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: key => ls.remove(key),
  },
  // paths: [],
})

const localPersist = createPersistedState({
  key: 'local_persist',
  storage: window.localStorage,
  // paths: [],
})

const cookiePersist = createPersistedState({
  key: 'cookie_persist',
  storage: {
    getItem: key => Cookies.get(key),
    setItem: (key, value) => {
      const exp = new Date(new Date().getTime() + (process.env.VUE_APP_DEFAULT_EXPIRE_TIME * 60 * 60 * 1000))
      Cookies.set(key, value, { expires: exp })
    },
    removeItem: key => Cookies.remove(key),
  },
  // paths: [],
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    settings,
    auth,
  },
  plugins: [
    securedPersist,
    cookiePersist,
    localPersist,
  ],
  state: {},
  mutations: {},
  actions: {},
})
