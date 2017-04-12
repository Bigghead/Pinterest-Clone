<template lang="html">
  <div class="">
    <nav class='deep-purple accent-2'>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo left">Pinterest Stuff</a>
        <ul id="nav-mobile" class="right ">

        <template v-if='user'>
          <li><router-link :to="`/images/${user._id}`">{{user.username}}</router-link></li>
          <li><router-link :to="'/images'">All Images</router-link></li>
          <li><a href='http://localhost:8000/logout' v-on:click='logOut'>Log Out</a></li>
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
  },
  created(){
    this.$store.dispatch('setUserState');
  },
  methods: {
    logOut(){
      this.$store.dispatch('logOut');
    }
  }
};
</script>

<style lang="css">
</style>
