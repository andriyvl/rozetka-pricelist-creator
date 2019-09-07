import '@babel/polyfill'
import Vue from 'vue'

// import './plugins/vuetify'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

import firebase from 'firebase'

import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyAm5OHzm-kTofw_yeOmw9XBMiBxDvb-LvE',
  authDomain: 'rozetka-price-list-creator.firebaseapp.com',
  databaseURL: 'https://rozetka-price-list-creator.firebaseio.com',
  projectId: 'rozetka-price-list-creator',
  storageBucket: 'rozetka-price-list-creator.appspot.com',
  messagingSenderId: '154614470459'
})

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      el: '#app',
      router,
      store,
      vuetify,
      render: h => h(App),
      created () {
        if (firebaseUser) {
          store.dispatch('autoSignIn', firebaseUser)
        }
      }
    })
    unsubscribe()
  })
