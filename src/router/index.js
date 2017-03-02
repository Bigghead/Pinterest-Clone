import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../components/Homepage.vue'
import Login from '../components/Login.vue'
import LocalLogin from '../components/LocalLogin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Homepage
    },
    {
      path: '/login',
      component: LocalLogin
    }
  ]
})
