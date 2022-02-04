const state = {
  // 用户 Token 信息
  token: window.localStorage.getItem('USER_TOKEN'),
}
const getters = {}
const mutations = {
  // 用户功能：设置用户 Token
  setUser (state, payload) {
    state.token = payload
    window.localStorage.setItem('USER_TOKEN', payload)
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
