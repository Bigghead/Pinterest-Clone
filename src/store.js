import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    images: []
  },
  mutations:{
    setUserState: function(state, userData){
       //state.count = userData;
       state.user = userData;
    },
    setImages: function(state, imageData){
      state.images = imageData;
    },
    addNewImage: function(state, newImage){
      state.images.unshift(newImage);
    }
  },
  actions:{
    setUserState(context, userData){
      axios.get('http://localhost:8000/testing').then((res) => {
        context.commit('setUserState', res.data);
      });
    },
    setImages: function(context, imageData){
      axios.get('http://localhost:8000/images').then((res)=>{
        context.commit('setImages', res.data);
      });
    },
    addNewImage(context, newImage){
      axios.post('http://localhost:8000/images/new', {
        link: newImage
      }).then((res) =>{
        console.log(res.data);
        context.commit('addNewImage', res.data);
      });
    }
  }
});
