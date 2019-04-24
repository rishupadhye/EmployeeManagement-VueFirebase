import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import firebase from 'firebase'
import '@/firebase'
Vue.use(Vuetify)
Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user=>{
  if(!app){
    app=new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
    
  }
})
