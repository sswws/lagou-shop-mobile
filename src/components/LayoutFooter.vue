<template>
  <van-tabbar>
    <van-tabbar-item
      to="/"
      icon="home-o"
    >
      首页
    </van-tabbar-item>
    <van-tabbar-item
      to="/category"
      icon="apps-o"
    >
      分类
    </van-tabbar-item>
    <van-tabbar-item
      to="/recommend"
      icon="gift-o"
    >
      推荐
    </van-tabbar-item>
    <van-tabbar-item
      to="/cart"
      icon="cart-o"
    >
      购物车
    </van-tabbar-item>
    <van-tabbar-item
      to="user"
      icon="user-o"
    >
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>

</script>

<style lang="scss" scoped>
// 增加 fixed 样式的权重
.van-tabbar {
  position: fixed !important;
}
</style>
