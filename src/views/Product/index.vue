<template>
  <van-nav-bar left-arrow fixed />
  <van-tabs scrollspy color="#FBC546">
    <van-tab title="商品">
      <!-- 1. 轮播图 -->
      <van-swipe :autoplay="3000" width="375" height="375">
        <van-swipe-item
          v-for="(item,index) in sliderImage"
          :key="index"
        >
          <img :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
      <!-- 2. 商品头部 -->
      <van-cell
        class="productHeader"
        :border="false"
      >
        <template #title>
          <div class="price">
            <!-- 商品价格 -->
            <span>¥{{ storeInfo?.price }}</span>
            <!-- 分享按钮 -->
            <van-icon name="share-o" size="20" class="share"></van-icon>
          </div>
          <!-- 商品标题 -->
          <div class="title" v-text="storeInfo?.store_name"></div>
        </template>
        <!-- 其他信息 -->
        <template #label>
          <span>原价: ¥{{ storeInfo?.ot_price }}</span>
          <span>库存: {{ storeInfo?.stock + storeInfo?.unit_name }}</span>
          <span>销量: {{ storeInfo?.fsales }}</span>
        </template>
      </van-cell>
      <!-- 3. 商品规格选择区域 -->
      <van-cell
        class="sku_window"
        is-link
      >
        <template #title>
          <span>已选择:</span>
        </template>
      </van-cell>
    </van-tab>
    <van-tab title="评价" class="comment">
      <van-cell-group>
        <!-- 总体评价情况 -->
        <van-cell
          is-link
          :title="replyInfo"
          :value="replyRate"
          to="/"
        ></van-cell>
        <!-- 评价列表 -->
        <comment-item
          v-if="replyCount !== 0"
          :reply="reply"
        />
      </van-cell-group>
    </van-tab>
    <van-tab title="推荐">
      <van-cell class="recommend">
        <p class="title">推荐商品</p>
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="item in goodsList"
            :key="item.id"
            :to="{
              name: 'product',
              params: {
                productId: item.id
              }
            }"
          >
            <van-image :src="item.image"></van-image>
            <p v-text="item.store_name"></p>
            <span>¥{{ item.price }}</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </van-tab>
    <van-tab title="详情">
      <div
        class="description"
        v-html="storeInfo?.description"
      ></div>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import CommentItem from '@/components/CommentItem.vue'

import { onBeforeRouteUpdate, useRouter } from 'vue-router'
const router = useRouter()

// ---- 请求商品数据 ----
import { getProductDetails } from '@/api/product'
import { computed, ref } from 'vue'
// 接收商品 ID
const { productId } = defineProps({
  productId: {
    type: String,
    required: true
  }
})
// 存储商品详情的所有数据
const productDetails = ref({})
const initProductDetails = async () => {
  const { data } = await getProductDetails(productId)
  if (data.status !== 200) {
    // 找不到对应商品，直接跳回首页
    return router.push({
      name: 'home'
    })
  }
  productDetails.value = data.data
}
initProductDetails(productId)

// ---- 商品数据处理 ----
// 1 商品详细信息
const storeInfo = computed(() => productDetails.value.storeInfo)
// 1.1 轮播图数据
const sliderImage = computed(() => storeInfo.value?.slider_image)
// 2 评价信息
// 2.1 好评数
const replyCount = computed(() => productDetails.value.replyCount || 0)
const replyInfo = computed(() => `用户评价(${ replyCount.value })`)
// 2.2 好评率
const replyChance = computed(() => productDetails.value.replyChance || 0)
const replyRate = computed(() => replyChance.value + '%好评率')
// 2.3 好评信息
const reply = computed(() => productDetails.value.reply)
// 3 推荐商品信息
const goodsList = computed(() => productDetails.value.good_list)

// ---- 通过导航守卫监听路由变化，并请求对应的新商品数据 ----
onBeforeRouteUpdate((to) => {
  // 清除旧的数据
  productDetails.value = {}
  // 回到顶部
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  // 重新根据最新 ID 请求商品信息
  initProductDetails(to.params.productId)
})

</script>

<style lang="scss" scoped>
// 为了避免问题，添加 fixed 样式权重
.van-nav-bar {
  position: fixed !important;
}

.van-tabs {
  background-color: #F2F2F2;
  // 顶部 tabs 的标题部分
  :deep(.van-tabs__wrap) {
  width: 80%;
  position: fixed;
  top: 0;
  z-index: 999;
  left: 50%;
  transform: translate(-50%);
}

// 底部主体内容容器
:deep(.van-tabs__content) {
  padding-top: 46px;
}

// 轮播图
.van-swipe-item img {
  width: 375px;
}

// 商品信息区域
:deep(.productHeader) {
  margin-bottom: 10px;

  // title 插槽部分
  .van-cell__title {
    .price {
      span {
        font-size: 24px;
        font-weight: 700;
      }

      .share {
        float: right;
      }
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow: hidden;
      -webkit-box-orient: vertical;
      margin: 5px 0 10px;
    }
  }

  // label 插槽
  .van-cell__label {
    display: flex;
    justify-content: space-between;
  }
 }

 // 商品规格区域
 .sku_window {
   margin-bottom: 10px;
 }

  // 商品评价区域(移动到公共组件 CommentItem 中)
 
  // 商品推荐区域
 :deep(.recommend) {
   margin-bottom: 10px;

   .title {
     font-size: 16px;
     font-weight: 700;
     padding: 5px 0;
   }

   .van-grid-item__content {
     padding: 0;
   }

   .van-grid-item {
     img {
       width: 107px;
       height: 107px;
     }

     p {
       padding: 0 3px;
       font-size: 14px;
       font-weight: 700;
       display: -webkit-box;
       -webkit-box-orient: vertical;
       overflow: hidden;
       -webkit-line-clamp: 2;
     }

     span {
       color: #F2270c;
       font-size: 12px;
       font-weight: 700;
       // 让元素单独靠左，可以设置 grid 的 center，或单独使用 flex 属性
       align-self: flex-start;
     }
   }
  }

  // 商品描述区域
  .description {
    width: 100%;

    :deep(img) {
      width: 100%;
    }
  }
}
</style>
