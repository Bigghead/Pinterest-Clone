<template lang="html">
  <div class=" images">
    <h2>Images</h2>

<div v-if='user'>
  <input type="text" name="" value="" v-model='imageLink'>
  <div class="">
    <button type="button" name="button" class='waves-effect waves-light btn' v-on:click.prevent='addNewImage'>Pin A New Image</button>
  </div>
</div>
    <div class="row">
     <div class="col s3" v-for="image in images">
       <div class="card">
         <div class="card-image">
           <img v-bind:src="image.link">
         </div>
         <div class="card-action">
           <a href="#" v-if='user'>Likes: {{ image.likedBy.length}}</a>
           <a v-else class='disabled'>Likes : {{ image.likedBy.length }}</a>
           <a href="#" v-if='user && image.addedBy === user.username' v-on:click.prevent='deleteImage(image._id)'>Delete</a>
          <router-link :to="'/user/images'" v-else>Pinned By: {{ image.addedBy }}</router-link>
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
   
    computed:{
      images(){
        return this.$store.state.images;
      },
      user(){
        return this.$store.state.user;
      }
    },
    methods:{
      addNewImage(){
        let vm = this;
        this.$store.dispatch('addNewImage', vm.imageLink);
      },

      deleteImage(id){
        let vm = this;
        this.$store.dispatch('deleteImage', id);
      }
    },
    created(){
      if(this.$store.state.images.length === 0){
        this.$store.dispatch('setImages');
      };
      // axios.get('http://localhost:8000/images')
      // .then((res) => {
      //   this.images = res.data;
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
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

  .row{
    margin-top: 5%;
  }

  img{
    height: 225px;
  }

  .disabled {
        pointer-events: none;
        cursor: default;
    }
  </style>
