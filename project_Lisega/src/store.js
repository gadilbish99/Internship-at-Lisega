import Vue from 'vue'
import Vuex from 'vuex'
import cookieHandler from "@/cookie";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: cookieHandler.isLoggedIn(),
    color: 'primary',
    isFasi: cookieHandler.isFasi()
  },
  mutations: {
    toggle(state){
      state.isFasi = cookieHandler.isFasi()
      state.status = cookieHandler.isLoggedIn()
    }
  },
  actions: {
    toggle({commit}){
      commit('toggle')
    }
  },

  getters: {
    isLoggedIn: state => state.status,
    variant: state => state.color,
    isFasi: state => state.isFasi
  }
})