// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//
import Header from './components/partials/Header.vue';



//alertify dialog position
//alertify.defaults.notifier.position = 'top-right';

/* eslint-disable no-new */

new Vue({
  el: '#root',
  data: {
    message: 'Hello Vue'
  },
  router,
  template: '<App/>',
  components: { App }
});
