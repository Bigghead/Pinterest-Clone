<template>
  <div id='app'>
    <nav-header></nav-header>
    <router-view></router-view>

  </div>

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
    color: white;
    background: #0B486B;
  }
</style>
