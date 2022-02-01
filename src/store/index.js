import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      // 用户 Token 信息
      user: window.localStorage.getItem('USER_TOKEN'),
      // 用于存储购物车的数据(sku 的 id，checked，count，image，title，price，stock)
      cartList: []
    }
  },
  mutations: {
    // 用户功能：设置用户 Token
    setUser (state, payload) {
      state.user = payload
      window.localStorage.setItem('USER_TOKEN', payload)
    },
    // --- 购物车功能 ---
    // 添加商品
    addToCart (state, payload) {
      // payload 应该为包含 sku 相关信息的对象，具体信息参考 state.cartList 说明
      state.cartList.push(payload)
    },
    // 清除数据
    clear (state) {
      state.cartList = []
    }
  }
})