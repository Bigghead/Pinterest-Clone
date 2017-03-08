<template lang="html">
  <div id='homepage'>
    <h1>Welcome to My Pinterest Clone</h1>
    <button @click='verifyUser'>Verify</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  methods:{
    verifyUser(){
      axios.get('http://localhost:8000/testing').then((res) => {
        console.log(res.data);
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
