import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../components/Homepage.vue'
import Login from '../components/Login.vue'
import LocalLogin from '../components/LocalLogin.vue'
import Images from '../components/Images.vue'

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
    },
    {
      path: '/images',
      component: Images
    }
  ]
})
