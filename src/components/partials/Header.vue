<template lang="html">
  <div class="">
    <nav class='deep-purple accent-2'>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo left">Pinterest Clone</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <template v-if='token'>
            <li><router-link :to="'/login'">User</router-link></li>
            <li><router-link :to="'/images'">All Images</router-link></li>
            <li><router-link :to="'/logout'">Log Out</router-link></li>
        </template>

        <template v-else>
          <li><router-link :to="'/login'">Log In</router-link></li>
          <li><router-link :to="'/images'">All Images</router-link></li>
        </template>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data(){
    return {
      token: false
    };
  },
  mounted(){
    if(localStorage.id_token){
      this.token = true;
    }
  }
};
</script>

<style lang="css">
</style>
