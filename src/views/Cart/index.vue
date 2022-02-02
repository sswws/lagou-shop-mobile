<template>
  <!-- 顶部导航 -->
  <van-nav-bar
    title="购物车"
    left-arrow
  ></van-nav-bar>

  <!-- 购物车列表 -->
  <div class="cart-list" v-if="hasItem">
    <cart-item
      v-for="item in cartList"
      :key="item.id"
      :itemData="item"
    />
  </div>
  <!-- 当购物车为空时展示 -->
  <van-empty v-else description="购物车还没有商品"></van-empty>

  <!-- 总计区域 -->
  <van-submit-bar
    :price="store.getters['cart/totalPrice'] * 100"
    button-text="去结算"
    @submit="handleClick"
  >
    <van-checkbox v-model="checkedAll" checked-color="#ee0a24">全选</van-checkbox>
  </van-submit-bar>

  <!-- 公共底部 -->
  <layout-footer></layout-footer>
</template>

<script setup>
import LayoutFooter from '@/components/LayoutFooter.vue'
import CartItem from './components/CartItem.vue'
import { computed, nextTick, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

// 引入接口
import { getCartList } from '@/api/cart'

// ---- 1 列表数据处理 ----
// 存储数据
const cartList = computed(() => store.state.cart.cartList)
// 检测购物车是否为空
const hasItem = computed(() => cartList.value.length !== 0)

// 初始化购物车数据
const initCartList = async () => {
  const { data } = await getCartList()
  if (data.status !== 200) { return }

  // 请求到新数据后，将原始数据清空，随后更新为新数据
  store.commit('cart/clear')

  await nextTick()

  // 数据处理,将处理后需要的数据通过 Vuex 进行状态管理
  data.data.valid.forEach(item => {
    // 提交给 addToCart 的数据必须符合要求
    // (sku 的 id，checked，count，title，price，stock，productId)
    store.commit('cart/addToCart', {
      id: item.id,
      checked: true,
      count: item.cart_num,
      image: item.productInfo.image,
      title: item.productInfo.store_name,
      price: item.truePrice,
      stock: item.trueStock,
      productId: item.product_id
    })
  })

}
initCartList()

// ---- 2 全选处理 ----
const checkedAll = computed({
  get: () => store.getters['cart/checkedAll'],
  set (newStatus) {
    store.commit('cart/changeAll', { checked: newStatus })
  }
})

// ---- 3 跳转 ----
import { useRouter } from 'vue-router'
const router = useRouter()

const handleClick = () => {
  router.push({
    name: 'order-confirm',
    // cartId 指的是要结算的所有 sku 的集合，以逗号连接后传递即可
    params: {
      cartId: store.getters['cart/checkedItems'].map(item => item.id).toString()
    }
  })
}
</script>

<style lang="scss" scoped>
// 导航区域
.van-nav-bar {
  position: fixed !important;
  width: 100%;
  top: 0;
}

// 列表区域
.cart-list {
  // 为了留出顶部导航和底部导航等区域的位置
  margin: 50px 0 100px;
  background-color: #F2F2F2;
}

// 总计区域
.van-submit-bar {
  bottom: 48px;
}
</style>
