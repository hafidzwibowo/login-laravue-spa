require('./bootstrap');

import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { router } from './router'
import store from './store'

import App from './App.vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


new Vue ({
    el: '#app',
    components: { App },
    router,
    store
})


