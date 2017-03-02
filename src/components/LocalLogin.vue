<template lang="html">
  <div class="">
    <form class="" action="index.html" method="post" v-on:submit.prevent="submitForm">
      <input type="text"   placeholder='User Name' v-model="username">
      <input type="text"   placeholder='Password' v-model='password'>
      <button  >Log In</button>
    </form>
    <button type="button" name="button" @click="test">Test</button>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: function(){
    return {
      username: '',
      password: ''
    };
  },
  methods:{
    submitForm(e){
      console.log(e);
      return axios.post('http://localhost:8000/login',{
        username: this.username,
        password: this.password
      })
           .then((response) => console.log(response));
    },
    test(){
      axios.get('http://localhost:8000/test').then((response) => console.log(response));
    }
  }
};
</script>

<style lang="css">
</style>
