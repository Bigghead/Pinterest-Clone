<template>
  <div >
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
#app {
}
</style>
