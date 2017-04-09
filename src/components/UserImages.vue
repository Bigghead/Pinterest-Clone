<template>
    <div class="grid" v-if='userImages.length > 0'>
        <div v-for='image in userImages'>
            <div class="grid-item">
                <img v-bind:src="image.link">

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
            console.log(this.$route.params.userID);
            const vm = this;
            axios.get('http://localhost:8000/images/' + this.$route.params.userID)
                .then((res) => {
                    console.log(res);
                    vm.userImages = res.data;
                });
        }
    }

</script>

<style scoped>
    .col {
        padding: 0 !important;
        margin: 0 !important;
    }
    
    .grid-item {
        width: 200px;
    }
    
    .grid-item--width2 {
        width: 400px;
    }
    
    .grid-item--width3 {
        width: 500px;
    }
</style>