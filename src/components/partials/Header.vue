<template lang="html">
  <div class="">
    <nav class='grey darken-4'>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo left hide-on-small-only">Pinterest Clone</a>
        <ul id="nav-mobile" class="right ">

        <template v-if='user'>
          <li><router-link :to="`/images/${user._id}`">{{user.username}}</router-link></li>
          <li><router-link :to="'/images'">All Images</router-link></li>
          <li><a href='https://blooming-everglades-99212.herokuapp.com/logout' v-on:click='logOut'>Log Out</a></li>
        </template>

        <template v-else>
          <li><a href='https://blooming-everglades-99212.herokuapp.com/auth'>Log In!</a></li>
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
