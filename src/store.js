import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    images: []
  },
  
  mutations: {
    setUserState: function (state, userData) {
      state.user = userData;
    },
    fetchUserData: function (state, userData) {
      state.user = userData;
    },
    setImages: function (state, imageData) {
      state.images = imageData;
    },
    addNewImage: function (state, newImage) {
      state.images.unshift(newImage);
    },
    deleteImage: function (state, imageId) {
      state.images.forEach((image, index) => {
        if (image._id === imageId) {
          state.images.splice(index, 1);
        }
      });
    }
  },
  
  actions: {
    setUserState(context, userData) {

      //if (window.localStorage.getItem("myData") === null || window.localStorage.getItem("myData") === '""') {
      //if (context.state.user === null || context.state.user === '') {
        axios.get('http://localhost:8000/verifyUser').then((res) => {
          //window.localStorage.setItem('myData', JSON.stringify(res.data))
          context.commit('setUserState', res.data);
        });
      //}
      // } else {
      //   context.commit('fetchUserData', JSON.parse(window.localStorage.getItem("myData")))
      // }

    },
    setImages(context, imageData) {
      axios.get('http://localhost:8000/images').then((res) => {
        context.commit('setImages', res.data);
      });
    },
    addNewImage(context, newImage) {
      axios.post('http://localhost:8000/images/new', {
        link: newImage
      }).then((res) => {
        context.commit('addNewImage', res.data);
      });
    },
    deleteImage(context, imageId) {
      axios.post('http://localhost:8000/images/delete', {
        imageId
      }).then(res => {
        context.commit('deleteImage', imageId);
      }).catch(err => {
        console.log(err);
      });
    },
    logOut(context) {
      axios.get('http://localhost:8000/logout')
        .then(() => {
          localStorage.removeItem('myData');
        });
    }
  }
});
