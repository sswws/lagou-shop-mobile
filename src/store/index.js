import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      user: window.localStorage.getItem('USER_TOKEN')
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      window.localStorage.setItem('USER_TOKEN', payload)
    }
  }
})