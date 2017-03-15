import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    count: 25
  },
  mutations:{
    setUserState: function(state, userData){
       //state.count = userData;
       state.user = userData;
    }
  }
});
