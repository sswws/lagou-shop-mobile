<template>
  <div class="cart-item">
    <!-- 状态选框 -->
    <van-checkbox checked-color="#ee0a24"></van-checkbox>
    <!-- 右侧点击跳转 -->
    <div class="link">
      <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQQ7OgUR3dsPcY9OBlBLDM3fthn6hOFNwXsdYDSLcKGrFTEksW7" alt="">
      <div class="info">
        <p class="title">华为HUAWEI MatePad Pro 10.8英寸2021款</p>
        <p class="detail">
          <span class="price">¥3666.00</span>
          <van-stepper
            max="10"
            button-size="26px"
          />
        </p>
        <p class="del">
          <span>删除</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.cart-item {
  height: 90px;
  padding: 10px 20px;
  display: flex;
  // 下面的样式用于设置多个商品间的分割线
  background-color: #fff;
  margin-bottom: 1px;

  .link {
    width: 100%;
    display: flex;

    img {
      width: 88px;
      height: 88px;
      align-self: center;
    }

    .info {
      font-size: 14px;
      .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 1;
        margin: 5px 0px 15px;
      }
      .detail {
        margin-bottom: 10px;

        .price {
          font-size: 16px;
          color: #F2270C
        }

        .van-stepper {
          float: right;
        }
      }
      .del {
        direction: rtl;
      }
    }
  }
}
</style>
