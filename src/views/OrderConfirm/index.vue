<template>
  <!-- 导航 -->
  <van-nav-bar
    title="订单确认"
    left-text="返回"
    left-arrow
  />
  <!-- 主体内容 -->
  <div class="container">主体内容</div>
</template>

<script setup>
// ---- 1 地址区域 ----
// - 请求数据
import { getAddressList } from '@/api/order'
const initAddressList = async () => {
  const { data } = await getAddressList({ limit: 5, page: 1 })
  console.log(data)
}
initAddressList()

</script>

<style lang="scss" scoped>
.van-nav-bar {
  position: fixed !important;
  width: 100%;
}

.container {
  padding: 50px 0;
}
</style>
