<template lang="html">
  <div id='homepage'>
    <h1>Welcome to My Pinterest Clone</h1>
    <button @click='verifyUser'>Verify</button>
    <hr>
    <hr>
    <div class="" v-if='user'>
      <h3>{{user.username}}</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      user: {}
    };
  },
  methods:{
    verifyUser(){
      axios.get('http://localhost:8000/verify').then((res) => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="css" scoped>
  #homepage{
    text-align: center;
  }
</style>
