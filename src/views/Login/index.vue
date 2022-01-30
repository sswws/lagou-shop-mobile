<template>
  <van-form @submit="submitHandle">
    <img class="logo" :src="state.logoUrl" alt="">
    <van-cell-group inset>
      <van-field
        v-model="state.username"
        clearable
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field
        v-if="state.isPassword"
        v-model="state.password"
        clearable
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
      />
      <van-field
        v-else
        v-model="state.captcha"
        center
        clearable
        name="验证码"
        label="短信验证码"
        placeholder="短信验证码"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="sendCaptcha"
            :disabled="state.isSend"
          />
            {{ state.currentText }}
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登陆
      </van-button>
      <span
        class="change-button"
        v-text="state.changeText"
        @click="changeMode"
      ></span>
    </div>
  </van-form>
</template>

<script setup>
import { computed, reactive } from "@vue/reactivity"
import { useStore } from 'vuex'
const store = useStore()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// 引入请求
import {
  getVerifyCode,
  getVerify,
  loginByPassword,
  loginByCaptcha
} from '@/api/user'

// 数据处理
const state = reactive({
  // 'captcha' 登陆模式
  loginMode: 'password',
  // 检测是否为密码登陆模式
  isPassword: computed(() => state.loginMode === 'password'),
  // 切换按钮文本处理
  changeText: computed(() => state.isPassword ? '快速登陆' : '密码登陆'),
  username: '17772138808',
  password: '123456',
  captcha: '',
  // 存储发送状态，用于控制显示效果
  isSend: false,
  // 倒计时实例
  countDown: null,
  // 根据状态设置要显示的内容
  currentText: computed(() => state.isSend ? state.countDown.seconds : '发送验证码'),
  // logo 地址
  logoUrl: ''
})

// 切换登录模式处理
const changeMode = () => {
  state.loginMode = state.isPassword ? 'captcha' : 'password'
  // 清除密码与验证码输入框的内容
  state.password = ''
  state.captcha = ''
}
// ---- 验证码处理 ----
import { Toast } from 'vant'
import { useCountDown } from '@vant/use'

// 发送验证码请求
const sendCaptcha = async () => {
  // 手机号规则校验
  if (!/^1\d{10}$/.test(state.username)) {
    return Toast('请检查用户名')
  }

  // 发送校验请求
  const { data: v1 } = await getVerifyCode()
  if (v1.status !== 200) { return }

  // 发送验证码请求
  const { data: v2} = await getVerify({
    type: 'login',
    phone: state.username,
    key: v1.data.key
  })
  if (v2.status !== 200) { Toast('网络开小差了,请稍后再试') }

  // 验证码发送完毕后，设置倒计时实例
  const countDown = useCountDown({
    time: 10 * 1000, // 实际为 60 * 1000 此处为演示值
    onFinish () {
      state.isSend = false
    }
  })
  // 开启倒计时
  countDown.start()
  state.countDown = countDown.current
  // 更改发送状态
  state.isSend = true
}

// ---- 登陆处理 ----
const submitHandle = async () => {
  // 用户名检测
  const username = state.username.trim()
  if (username === '') { return Toast('请检测用户名') }

  // 为了统一存储响应结果，使用变量保存
  let data = ''
  if (state.isPassword) {
    // 1 密码模式
    const password = state.password.trim()
    if (password === '') { return Toast('请检测密码') }
    ({ data } = await loginByPassword({
      account: username,
      password
    }))
  } else {
    // 2 验证码模式
    const captcha = state.captcha.trim()
    if (captcha === '') { return Toast('请检查验证码') }
    ({ data } = await loginByCaptcha({
      phone: username,
      captcha
    }))
  }
  // 接收响应数据
  if (data.status !== 200) { return Toast('用户名或密码错误') }
  // 成功时，通过 mutation 提交新的 token 信息
  store.commit('setUser', data.data.token)
  // 跳转页面
  router.push(route.query.redirect ?? '/user')
}

// ---- 头像处理 ----
import { getLogo } from '@/api/index'
const loadLogo = async () => {
  const { data } = await getLogo()
  if (data.status !== 200) { return }
  state.logoUrl = data.data.logo_url
}
loadLogo()

</script>

<style lang="scss" scoped>
.van-form {
  display: flex;
  flex-direction: column;
}
.logo {
  width: 100%;
  align-self: center;
  margin: 70px 0 10px;
}
.change-button {
  display: block;
  text-align: center;
  font-size: 14px;
  color: #999;
  margin-top: 10px;
}
</style>
