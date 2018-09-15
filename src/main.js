// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueNativeSock from 'vue-native-websocket'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'


Vue.config.productionTip = false
Vue.use(VueNativeSock, 'ws://192.168.1.30:8080')

Vue.use(Vuetify, {
  theme: {
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3,
    teal: colors.teal
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})