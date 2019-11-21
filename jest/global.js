
import Vue from "vue";
global.Vue = Vue;
import Vuex from 'vuex'
import ilqForm from 'lq-form'
import vuetify from 'vuetify'
import helper from 'vuejs-object-helper'
import store from '@/store'
import lqVuetify from '../src/main'
import axios from '../src/dev/axios'

Vue.use(Vuex)
Vue.use(ilqForm, { store })
Vue.use(helper)
Vue.use(vuetify)
Vue.use(lqVuetify)
Vue.use(axios)

