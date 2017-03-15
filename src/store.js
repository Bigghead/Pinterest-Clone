import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { _id: '58bbad1094e5750c8903332a',
            username: 'Ron Swanson',
            __v: 0 },
    count: 25
  },
  mutations:{
    setUserState: function(state, userData){
       //state.count = userData;
       state.user = userData;
    }
  }
});
