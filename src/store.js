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
    },
    addOrRemoveLike(state, imageId) {
      state.images.forEach((image, index) => {
        if (image._id === imageId) {
          if (image.likedBy.indexOf(state.user._id) === -1) {
            image.likedBy.push(state.user._id);
          } else {
            image.likedBy.splice(image.likedBy.indexOf(state.user._id))
          }
        }
      });
    }
  },

  actions: {
    setUserState(context, userData) {
      axios.get('http://localhost:8000/verifyUser').then((res) => {
        context.commit('setUserState', res.data);
      });
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
    addOrRemoveLike(context, imageId) {
      axios.post(`http://localhost:8000/images/${imageId}/update`)
          .then(res => {
          context.commit('addOrRemoveLike', imageId);
        }).catch(err => {
          console.log(err);
        })
    },
    logOut(context) {
      axios.get('http://localhost:8000/logout')
        .then(() => {
          localStorage.removeItem('myData');
        });
    }
  }
});
