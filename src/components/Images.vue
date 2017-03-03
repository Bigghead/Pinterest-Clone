<template lang="html">
  <div class=" images">
    <h2>Images</h2>
    <button type="button" name="button" v-on:click='getSecretThing'>Get Secret</button>
    <div class="row" >
      <img  alt="" v-for='image in images' v-bind:src='image'>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return {
      images: []
    };
  },
  methods:{
    getSecretThing() {
   var jwtHeader = { 'Authorization': 'JWT ' + localStorage.getItem('id_token') };
   axios.get('http://localhost:8000/secret', {
     headers: {
       'Authorization': 'JWT ' + localStorage.getItem('id_token')
     }
   })
        .then((data) => {
     console.log('Success');
    });
   }
  },
  created(){
    axios.get('http://localhost:8000/images')
         .then((res) => {
           this.images = res.data;
         })
         .catch((err) => {
           console.log(err);
         });
  }
};
</script>

<style lang="css" scoped>
  .images{
    text-align: center;
  }
</style>
