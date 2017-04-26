<template>
    <div  v-if='userImages.length > 0'>

        <!--<img v-for='image in userImages' class='grid-item' v-bind:src="image.link" alt="">-->
        <div class="grid" >
            <div class="grid-item" v-for='image in userImages'  >
                <div class="card" >
                    <div class="card-image" :class='randomGrid()'>
                        <img :src="image.link" >
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
        data() {
            return {
                userImages: []
            }
        },

        created() {
            const vm = this;
            console.log(this.$route.params.userID);
            axios.get('http://localhost:8000/images')
                .then(res => {
                    vm.userImages = res.data;
                });
        },

        methods: {
            randomGrid() {
                // const gridLayout = ['grid-item', 'grid-item grid-item--height2', 'grid-item grid-item--width2'];
                const gridLayout = ['grid-item--height1', 'grid-item--height2', 'grid-item--height3'];

                return gridLayout[Math.floor(Math.random() * gridLayout.length)];
            },
            getItemElement() {
                var elem = document.createElement('div');
                var wRand = Math.random();
                var hRand = Math.random();
                var widthClass = wRand > 0.8 ? 'grid-item--width3' : wRand > 0.6 ? 'grid-item--width2' : '';
                var heightClass = hRand > 0.85 ? 'grid-item--height4' : hRand > 0.6 ? 'grid-item--height3' : hRand > 0.35 ? 'grid-item--height2' : '';
                return 'grid-item ' + widthClass + ' ' + heightClass;
            }
        }
    }

</script>

<style scoped>


    .grid { /* Masonry container */
    column-count: 5;
    column-gap: 1em;
}

.grid-item { /* Masonry bricks or child elements */
    background-color: #eee;
    display: inline-block;
    margin: 0 0 1em;
    width: 100%;
}
</style>