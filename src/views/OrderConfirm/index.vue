<template>
  <!-- 导航 -->
  <van-nav-bar
    title="订单确认"
    left-text="返回"
    left-arrow
  />
  <!-- 主体内容 -->
  <div class="container">
    <!-- 地址区域 -->
    <div class="address-card" @click="triggerPopup">
      <p class="info">
        <span class="username">小韩</span>
        <span>17201234567</span>
      </p>
      <p class="detail">
        <span class="default">[默认]</span>
        <span>上海市浦东新区A小区6楼8单元</span>
      </p>
    </div>
    <!-- 2 弹出层 -->
    <van-popup
      v-model:show="popupStatus"
      position="bottom"
    >
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      default-tag-text="默认"
      @click-item="changeAddress"
      @add="onAdd"
      @edit="onEdit"
    >
      <!-- 地址为空时显示 -->
      <template #top v-if="isEmpty">
        <van-empty description="暂无地址" />
      </template>
    </van-address-list>
    </van-popup>
  </div>
</template>

<script setup>
import { Toast } from 'vant';
import { computed, ref } from 'vue'

// ---- 1 地址区域 ----
// 弹出层显示状态控制
const popupStatus = ref(false)
const triggerPopup = () => popupStatus.value = true

// - 选择状态
const chosenAddressId = ref('1')
const changeAddress = () => popupStatus.value = false

// - 地址数据
const addressList = ref([
  // {
  //   id: '1',
  //   name: '张三',
  //   tel: '13000000000',
  //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
  //   isDefault: true,
  // },
  // {
  //   id: '2',
  //   name: '李四',
  //   tel: '1310000000',
  //   address: '浙江省杭州市拱墅区莫干山路 50 号',
  // },
])
const isEmpty = computed(() => addressList.value.length === 0)

// - 请求数据
import { getAddressList } from '@/api/order'
const initAddressList = async () => {
  const { data } = await getAddressList({ limit: 5, page: 1 })
  console.log(data)
}
initAddressList()

// - 地址操作
const onAdd = () => Toast('新增地址')
const onEdit = (item, index) => Toast('编辑地址:' + index)

</script>

<style lang="scss" scoped>
.van-nav-bar {
  position: fixed !important;
  width: 100%;
}

.container {
  padding: 50px 0;

  // 地址卡片
.address-card {
  padding: 20px 25px;
  font-size: 16px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: repeating-linear-gradient(90deg, #ff6c6c 0, #ff6c6c 20%, transparent 20%, transparent 25%, #0084ff 25%, #0084ff 45%, transparent 45%, transparent 50%);
    background-size: 80px;
  }

  .info {
    span:first-child {
      padding-right: 20px;
    }
  }

  .detail {
    padding-top: 5px;
    .default {
      padding-right: 5px;
      background: #D6251F;
      color: #fff;
      font-size: 12px;
      padding: 2px 3px;
      margin-right: 17px;
      border-radius: 3px;
    }
  }
 }
}
</style>
