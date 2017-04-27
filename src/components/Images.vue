<template lang="html">
  <div class=" images">
    <h2>Images</h2>

    <div v-if='user'>
      <form v-on:submit.prevent='addNewImage'>
        <input type="text" name="" value="" v-model='imageLink'>
        <div class="">
          <button type="button" name="button" class='waves-effect waves-light btn' v-on:click.prevent='addNewImage'>Pin A New Image</button>
        </div>
      </form>

    </div>
    <div class="grid ">
      <div class="grid-item" v-for="image in images">
        <div class="card">
          <div class="card-image" :class='randomGrid()'>
            <img v-bind:src="image.link">
          </div>
          <div class="card-action">
            <a href="#" v-if='user' v-on:click.prevent='addOrRemoveLike(image._id)'>Likes: {{ image.likedBy.length}}</a>
            <a v-else class='disabled'>Likes : {{ image.likedBy.length }}</a>
            <hr>
            <div v-if='user && image.addedById === user._id'>
              <a href="#" v-on:click.prevent='deleteImage(image._id)'><br>Delete</a>
            </div>
            <div v-else>
              <router-link :to="'/images/' + image.addedById "><br>{{ image.addedBy }}</router-link>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        imageLink: ''
      };
    },

    computed: {
      images() {
        return this.$store.state.images;
      },
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      addNewImage() {
        let vm = this;
        this.$store.dispatch('addNewImage', vm.imageLink);
        vm.imageLink = '';
      },

      deleteImage(id) {
        let vm = this;
        this.$store.dispatch('deleteImage', id);
      },
      randomGrid() {
        // const gridLayout = ['grid-item', 'grid-item grid-item--height2', 'grid-item grid-item--width2'];
        const gridLayout = ['grid-item--height1', 'grid-item--height2', 'grid-item--height3'];

        return gridLayout[Math.floor(Math.random() * gridLayout.length)];
      },

      addOrRemoveLike(id){
        this.$store.dispatch('addOrRemoveLike', id);
      }
    },
    created() {
      if (this.$store.state.images.length === 0) {
        this.$store.dispatch('setImages');
      };
    }
  };

</script>

<style lang="css" scoped>
  .images {
    text-align: center;
    color: white;
  }
  
  input {
    width: 50%;
    text-align: center;
  }
  
  .row {
    margin-top: 5%;
  }
  
  /*img {
    height: 225px;
  }*/
  
  .disabled {
    pointer-events: none;
    cursor: default;
  }
  
  .grid {
    margin: 25px auto 0 auto;
    width: 95%;
    
    /* Masonry container */
    column-count: 5;
    column-gap: 1em;
  }
  
  .grid-item {
    /* Masonry bricks or child elements */
    background-color: #eee;
    display: inline-block;
    margin: 0 0 1em;
    width: 100%;
  }

  @media only screen and (min-width: 400px) {
    .grid {
        -moz-column-count: 2;
        -webkit-column-count: 2;
        column-count: 2;
    }
}

@media only screen and (min-width: 700px) {
    .grid {
        -moz-column-count: 3;
        -webkit-column-count: 3;
        column-count: 3;
    }
}

@media only screen and (min-width: 900px) {
    .grid {
        -moz-column-count: 4;
        -webkit-column-count: 4;
        column-count: 4;
    }
}

@media only screen and (min-width: 1100px) {
    .grid {
        -moz-column-count: 5;
        -webkit-column-count: 5;
        column-count: 5;
    }
}

@media only screen and (min-width: 1280px) {
    .wrapper {
        width: 1260px;
    }
}

  
</style>