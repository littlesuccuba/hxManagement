import Vue from 'vue'
import Vuex from 'vuex'
import tabs from './tabs/index'
import users from './users/index'

/* eslint-disable */

Vue.use(Vuex)

export default new Vuex.Store({
  // state,
  // getters,
  // mutations,
  // actions,
  modules:{
    tabs,
    users
  }
})
