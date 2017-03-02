<template>
  <div id='app'>
    <nav-header></nav-header>
    <router-view></router-view>

  </div>
</template>

<script>
import Header from './components/partials/Header.vue';

export default {
  name: 'app',
  components: {
    'nav-header': Header
  }
};
</script>

<style>
body {
  background: #F0F2F0; /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #F0F2F0 , #000C40); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #F0F2F0 , #000C40); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
