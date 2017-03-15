<template lang="html">
  <div id='homepage'>
    <h1>Welcome to My Pinterest Clone!!!!!!!!!</h1>
    <button @click='verifyUser'>Verify</button>
    <hr>
    <div class="" v-if='user'>
      <h3>{{user.username}}</h3>
    </div>
  </div>
</template>

<script>
import mutations from '../store.js';
import axios from 'axios';
export default {
  mounted(){
    axios.get('http://localhost:8000/testing').then((res) => {
      this.$store.commit('setUserState', res.data);
    });
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

<style lang="css" scoped>
  #homepage{
    text-align: center;
  }
</style>
