<template lang="html">
  <div class="login">
    <h2>Log In</h2>
    <form class="" action="index.html" method="post" v-on:submit.prevent="submitForm">
      <input type="text"   placeholder='User Name' v-model="username">
      <input type="text"   placeholder='Password' v-model='password'>
      <button  class='waves-effect waves-light red lighten-2 btn'>Log In</button>
    </form>

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
    submitForm(){
      return axios.post('http://localhost:8000/login',{
        username: this.username,
        password: this.password
      })
           .then((response) => {
             console.log(response.data);
             localStorage.setItem('id_token', response.data.token);
             //redirect to home page
             this.$router.push('/');
             })
             .catch((err) => {
               alertify.error(err.response.data.message);
               //this.$router.push('/register');
             });
    },
    test(){
      axios.get('http://localhost:8000/test').then((response) => console.log(response));
    }
  },
  mounted(){
    if(localStorage.getItem('id_token')){
      this.$router.push('/');
    }
  }
};
</script>

<style lang="css" scoped>

  .login{
    margin: auto;
    color: white;
    width: 70%;
    text-align: center;
  }


</style>
