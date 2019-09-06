import Vue from 'vue'
import App from './App'
import Boilerplate from './Boilerplate'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import router from './router'
// import '@mdi/font/css/materialdesignicons.css'
import lqForm from 'lq-form'
import store from '../store'
import './axios'
import VueCroppie from 'vue-croppie'
import 'croppie/croppie.css' // import the croppie css manually
import lqVuetify from '../main'
import 'vuetify/dist/vuetify.min.css'

import helper from 'vuejs-object-helper'
Object.defineProperty(Vue.prototype, '$helper',   {value: helper});
Vue.use(VueCroppie)
Vue.use(lqVuetify)
// import '../../node_modules/@mdi/font/css/materialdesignicons.css'

Vue.use(lqForm, { store })

Vue.config.performance = true

Vue.use(Vuetify)
Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
      "primary": "#000000",
  }
})
Vue.use(VueRouter)
const vuetify = new Vuetify({})
Vue.component(Boilerplate.name, Boilerplate)

const vm = new Vue({
  data: () => ({ isLoaded: document.readyState === 'complete' }),
  store,
  vuetify,
  render (h) {
    return this.isLoaded ? h(App) : undefined
  },
  router
}).$mount('#app')

// Prevent layout jump while waiting for styles
vm.isLoaded || window.addEventListener('load', () => {
  vm.isLoaded = true
})
