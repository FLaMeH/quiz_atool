<template>
  <div id="app" v-cloak>
    <localization />
  </div>
</template>

<script>
import Localization from "@/localization";

export default {
  name: 'app',
  data() {
    return {
      pageTitle:'',
    }
  },
  components: {
    Localization,
  },
  watch: {
    '$route'(to) {
      const query = Object.assign({}, to.query)
      this.getTitle()
      this.$store.commit('settings/SETUP_URL_SETTINGS', query)
    },
  },
  metaInfo() {
    return {
      titleTemplate: '%s - ' + this.$config.title || '益学网',
      title: this.pageTitle,
      htmlAttrs: {
        lang: 'zh-CN',
        amp: true,
      },
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { rel: 'favicon', href: 'favicon.ico' },
      ],
    }
  },
  methods: {
    async getTitle() {
      this.pageTitle = this.$route.meta.title || '首页'
    },
  },
  mounted() {
    this.getTitle()
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
