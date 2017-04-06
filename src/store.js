import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    images: []
  },
  mutations: {
    setUserState: function (state, userData) {
      //state.count = userData;
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
        console.log(image._id === imageId);
        if (image._id === imageId) {
          console.log(image);
          console.log(index);
          console.log(imageId);
          state.images.splice(index, 1);
          //return;
        }
      });
      //state.images.splice(state.images.indexOf(imageId), 1);
      //state.images.splice(state.images.indexOf(imageId), 1, images)
    }
  },
  actions: {
    setUserState(context, userData) {

      if (window.localStorage.getItem("myData") === null || window.localStorage.getItem("myData") === '""') {
        axios.get('http://localhost:8000/verifyUser').then((res) => {
          console.log(res.data);
          window.localStorage.setItem('myData', JSON.stringify(res.data))
          context.commit('setUserState', res.data);
        });
      } else {
        context.commit('fetchUserData', JSON.parse(window.localStorage.getItem("myData")))
      }

    },
    setImages: function (context, imageData) {
      axios.get('http://localhost:8000/images').then((res) => {
        context.commit('setImages', res.data);
      });
    },
    addNewImage(context, newImage) {
      axios.post('http://localhost:8000/images/new', {
        link: newImage
      }).then((res) => {
        console.log(res.data);
        context.commit('addNewImage', res.data);
      });
    },
    deleteImage(context, imageId) {
      // axios.post('http://localhost:8000/images/delete', {
      //   imageId
      // }).then(res => {
      //console.log(res.data);
      context.commit('deleteImage', imageId);
      //}).catch(err => {
      //console.log(err);
      //});
    },
    logOut(context) {
      axios.get('http://localhost:8000/logout')
        .then(() => {
          localStorage.removeItem('myData');
        });
    }
  }
});
