import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import {store} from './store'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import "vue-material-design-icons/styles.css"

Vue.use(Vuetify)
// Vue.component("menu-icon", MenuIcon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})