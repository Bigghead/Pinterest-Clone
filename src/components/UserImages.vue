<template>
    <div class="grid center-align">

        <div class='each-image' v-for='image in userImages'>
            <img v-bind:src='image' alt="" :class="randomGrid()">
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
            console.log(this.$route.params.userID);
            const vm = this;
            axios.get('https://www.instagram.com/itswhitenoise/media/').then((res) => {
                     const images = [];
                
                          for (let post of res.data.items) {
                                       images.push(post.images.standard_resolution.url);
                                      }
                       vm.userImages = images;
                      });
            
        },
        methods: {
            randomGrid() {
                const gridLayout = ['grid-item', 'grid-item grid-item--width2', 'grid-item grid-item--width3', 'grid-item grid-item--width4',];

                return gridLayout[Math.floor(Math.random() * gridLayout.length)];

            }
        }
    }

</script>

<style scoped>
    .col {
        padding: 0 !important;
        margin: 0 !important;
    }

    .grid{
        margin: 0, 2%, 0, 2% !important;
    }
    
    .each-image {
        display: inline;
    }
    
    .grid-item {
        width: 20%;
        height: 200px;
        background: #D26;
        border: 2px solid #333;
        border-color: hsla(0, 0%, 0%, 0.5);
        border-radius: 5px;
    }
    
    .grid-item--width2 {
        width: 25%;
    }
    
    .grid-item--width3 {
        width: 30%;
    }
    
    .grid-item--width4 {
        width: 35%;
    }
    
    .grid-item--height2 {
        height: 200px;
    }
    
    .grid-item--height3 {
        height: 260px;
    }
    
    .grid-item--height4 {
        height: 360px;
    }
    
    img {
        object-fit: cover;
    }
</style>