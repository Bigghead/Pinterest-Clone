<template>
    <div  v-if='userImages.length > 0'>

        <h1 class="center-align">All Images By {{ userImages[0].addedBy  }}</h1>
        <!--<img v-for='image in userImages' class='grid-item' v-bind:src="image.link" alt="">-->
        <div class="grid center-align" >
            <div class="grid-item" v-for='image in userImages'  >
                <div class="card" >
                    <div class="card-image" >
                        <img :src="image.link" >
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
                userImages: []
            }
        },

        created() {
            const vm = this;
            axios.get('https://blooming-everglades-99212.herokuapp.com/images/' + this.$route.params.userID)
                .then(res => {
                    vm.userImages = res.data;
                });
        }
    }

</script>

<style scoped>


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
    display: block;
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