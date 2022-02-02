const state = {
  // 用于存储购物车的数据(sku 的 id，checked，count，image，title，price，stock，productId)
  cartList: []
}
const getters = {
  // 筛选选中的选项
  checkedItems: state => {
    return state.cartList.filter(item => item.checked === true)
  },
  // 基于选中项目计算价格
  totalPrice (state, getters) {
     // 对所有勾选商品进行价格统计，并保留两位小数
    return getters.checkedItems.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2)
  },
  // 全选按钮状态
  checkedAll (state, getters) {
    return state.cartList.length === getters.checkedItems.length
  }
}
const mutations = {
  // 添加商品
  addToCart (state, payload) {
    // payload 应该为包含 sku 相关信息的对象，具体信息参考 state.cartList 说明
    state.cartList.push(payload)
  },
  // 清除数据
  clear (state) {
    state.cartList = []
  },
  // 商品状态更改
  checkedChange (state, { id, checked }) {
    // 根据传参，找到指定数据，修改状态
    const currentItem = state.cartList.find(item => item.id === id)
    currentItem.checked = checked
  },
  // 商品个数更改
  countChange (state, { id, count }) {
    state.cartList.find(item => item.id === id).count = count
  },
  // 全选(主动操作全选按钮)
  changeAll (state, { checked }) {
    // 为所有选项设置统一的状态
    state.cartList.forEach(item => item.checked = checked)
  }
}

// 导入请求模块
import { changeCartItemNum } from '@/api/cart'

const actions = {
  async countChange ({ commit }, payload) {
    // 提交 mutation 更改数据
    commit('countChange', payload)
    // 发送请求
    const { data } = await changeCartItemNum({
      id: payload.id,
      number: payload.count
    })
    if (data.status !== 200) { return }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}