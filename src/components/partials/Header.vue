<template lang="html">
  <div class="">
    <nav class='deep-purple accent-2'>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo left">Pinterest Stuff</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">

        <template v-if='user'>
          <li><a href='#a'>{{user.username}}</a></li>
          <li><router-link :to="'/images'">All Images</router-link></li>
          <li><a href='http://localhost:8000/logout'>Log Out</a></li>
        </template>

        <template v-else>
          <li><a href='http://localhost:8000/auth'>Log In!</a></li>
          <li><router-link :to="'/images'">All Images</router-link></li>
          <!-- <li><a href='http://localhost:8000/logout'>Log Out</a></li> -->
        </template>

        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {

  computed: {
    user(){
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="css">
</style>
