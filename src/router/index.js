import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../components/Homepage.vue'
import Login from '../components/Login.vue'
import LocalLogin from '../components/LocalLogin.vue'
import Images from '../components/Images.vue'
import Register from '../components/Register.vue'
import UserImages from '../components/UserImages.vue';
import MasonryTest from '../components/masonryTest.vue';

Vue.use(Router)

export default new Router({
  history: true,
  routes: [
    {
      path: '/',
      component: Homepage
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/images',
      component: Images
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/images/:userID',
      component: MasonryTest
    }
  ]
})