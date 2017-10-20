<template>
  <waterfall :line-gap="200" :watch="userImages" >
  <!-- each component is wrapped by a waterfall slot -->
  <div class='waterfall center-align' >
       <waterfall-slot
    v-for="(image, index) in userImages"
    :width="450"
    :height="randomHeight()"
    :order="index"
    :key="image._id"
  >
<!--    
      your component
      
    -->
<img :src='image.link' alt="">
    
  </waterfall-slot>
  </div>
</waterfall>


</template>

<script>
    import axios from 'axios';
    import Waterfall from 'vue-waterfall/lib/waterfall'
    import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
    export default {
        data() {
            return {
                userImages: [],
                width: '400px',
                height: '250px'
            }
        },
        components: {
            'waterfall': Waterfall,
            'waterfall-slot': WaterfallSlot
        },
        created() {
            const vm = this;

            axios.get('http://localhost:8000/images/' + this.$route.params.userID)
                .then(res => {
                    vm.userImages = res.data;
                })
            // axios.get('https://www.instagram.com/itswhitenoise/media/').then((res) => {
            //          const images = [];

            //               for (let post of res.data.items) {
            //                            images.push(post.images.standard_resolution.url);
            //                           }
            //            vm.userImages = images;
            //    images.forEach(link => {
            //        axios.post('http://localhost:8000/images/new' ,{
            //            link: link
            //        })
            //    });
            //});

        },
        methods: {
            randomGrid() {
                const gridLayout = ['grid-item', 'grid-item grid-item--height2', 'grid-item grid-item--height3', 'grid-item grid-item--height4',];

                return gridLayout[Math.floor(Math.random() * gridLayout.length)];

            },
            randomHeight(){
                return Math.floor(Math.random() * (600 - 275) + 275);
            }
        }
    }

</script>

<style scoped>
    .waterfall{
        border: 10px solid black;
    }
    
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border: 2px solid grey;
        margin: 2px;
    }
</style>