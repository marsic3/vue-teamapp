import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import {store} from './store'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import "vue-material-design-icons/styles.css"
import * as firebase from 'firebase'
import 'firebase/firestore'
import Alert from './components/Shared/Alert'
import EditProjectDialog from './components/Projects/Edit/EditProjectDialog'
import firebaseConfig from '../config/firebaseConfig'

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
const settings = {timestampsInSnapshots: true};
db.settings(settings);

Vue.use(Vuetify)
// Vue.component("menu-icon", MenuIcon)
Vue.config.productionTip = false
Vue.component('app-alert', Alert)
Vue.component('app-edit-project-dialog', EditProjectDialog)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){
  firebase.auth().onAuthStateChanged(user => {
    if(user){
      this.$store.dispatch('autoSignIn', user)
    }
  })
  this.$store.dispatch('loadedProject')
  }
})