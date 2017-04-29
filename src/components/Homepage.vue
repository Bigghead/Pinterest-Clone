<template lang="html">
  <div id='homepage'>
    <h1>Welcome to My Pinterest Clone</h1>
    <hr>
    <!--<div class="" v-if='user'>
      <h3>Welcome, {{user.username}}</h3>
    </div>-->
  </div>
</template>

<script>
import mutations from '../store.js';
import axios from 'axios';
export default {
  mounted(){

    // //call an action from VUEX store
    // this.$store.dispatch('setUserState');
  },
  computed:{
    user: function(){
      return this.$store.state.user;
    }
  },
  methods:{
    verifyUser(){
      console.log(this.$store);
      this.user = this.$store.state.user;
    }
  }
};
</script>

<style lang="css" >

  body{
    font-family: Amaranth;
  }
  #homepage{
    margin: 20% auto;
    text-align: center;
  }
</style>
