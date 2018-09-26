import Vue from 'vue'
import App from './App'
import VueSocketio from 'vue-socket.io';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3,
    teal: colors.teal
  }
});

Vue.use(VueSocketio, 'http://192.168.1.21:5000');

Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
