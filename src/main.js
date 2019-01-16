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
import AlertSuccess from './components/Shared/AlertSuccess'
import EditProjectDialog from './components/Projects/Edit/EditProjectDialog'
import firebaseConfig from '../config/firebaseConfig'
import swatches from 'vue-swatches';
import "vue-swatches/dist/vue-swatches.min.css"
import Widget from '../src/plugin/components/Widget';
import SocialWidget from '../src/plugin/components/SocialWidget';
import DataTable from '../src/plugin/components/DataTable';
import TimeLine from '../src/plugin/components/TimeLine';
import UserTreeView from '../src/plugin/components/UserTreeView';
import Stepper from '../src/plugin/components/Stepper';


import PrettyInput from 'pretty-checkbox-vue/input';
import PrettyCheck from 'pretty-checkbox-vue/check';
import PrettyRadio from 'pretty-checkbox-vue/radio';

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
const settings = {timestampsInSnapshots: true};
db.settings(settings);


Vue.use(Vuetify)
// Vue.use(VueMaterial)

// Vue.component("menu-icon", MenuIcon)
Vue.config.productionTip = false
Vue.component('swatches', swatches);
Vue.component('app-alert', Alert)
Vue.component('app-alert-success', AlertSuccess)
Vue.component('app-edit-project-dialog', EditProjectDialog)
Vue.component('widget', Widget);
Vue.component('social-widget', SocialWidget);
Vue.component('data-table', DataTable);
Vue.component('time-line', TimeLine);
Vue.component('user-tree-view', UserTreeView);
Vue.component('stepper', Stepper);
Vue.component('p-input', PrettyInput);
Vue.component('p-check', PrettyCheck);
Vue.component('p-radio', PrettyRadio);

// Vue.component('location-statistic', LocationStatistic);
// Vue.component('site-view-statistic', SiteViewStatistic);
// Vue.component('total-earnings-statistic', TotalEarningsStatistic);
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
      // console.log(user)
      this.$store.dispatch('loadUserInfo', user)
    }
  })
  this.$store.dispatch('loadedProject')
  this.$store.dispatch('loadedEmployee')
  this.$store.dispatch('loadedHolidays')
  

  }
})