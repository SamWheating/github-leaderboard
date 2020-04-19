import Vue from 'vue'
import VueRouter from 'vue-router'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

const routes = [
  { path: '/food', component: App },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.use(VueRouter)
Vue.use(VueClipboard)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
