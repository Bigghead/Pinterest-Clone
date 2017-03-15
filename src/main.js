// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//=========COMPONENTS==
import Header from './components/partials/Header.vue';

//=========VUEX========
import store from './store.js';

//alertify dialog position
//alertify.defaults.notifier.position = 'top-right';

/* eslint-disable no-new */

new Vue({
  el: '#root',
  data: {
    message: 'Hello Vue'
  },
  router,
  store: store,
  template: '<App/>',
  components: { App }
});
