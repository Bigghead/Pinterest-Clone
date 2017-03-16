<template lang="html">
  <div class=" images">
    <h2>Images</h2>

  <input type="text" name="" value="" v-model='imageLink'>
  <div class="">
    <button type="button" name="button" class='waves-effect waves-light btn' v-on:click.prevent='addNewImage'>Pin A New Image</button>
  </div>
    <div class="row">
     <div class="col s3" v-for="image in images">
       <div class="card">
         <div class="card-image">
           <img v-bind:src="image.link">
           <span class="card-title">Card Title</span>
         </div>
         <div class="card-action">
           <a href="#">This is a link</a>
         </div>
       </div>
     </div>
   </div>

    </div>
  </template>

  <script>
  import axios from 'axios';
  export default {
    data(){
      return {
        imageLink: ''
      };
    },
    mounted(){
      this.$store.dispatch('setImages');
    },
    computed:{
      images(){
        return this.$store.state.images;
      }
    },
    methods:{
      addNewImage(){
        let vm = this;
        this.$store.dispatch('addNewImage', vm.imageLink);
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
    color: white;
  }

  input{
    width: 50%;
    text-align: center;
  }
  </style>
