import request from '@/utils/request'

// 获取用户验证码，避免重复发送
export const getVerifyCode = () => request({
  method: 'GET',
  url: '/verify_code'
})

// 获取短信验证码
export const getVerify = data => request({
  method: 'POST',
  url: '/register/verify',
  data
})

// 密码登录
export const loginByPassword = data => request({
  method: 'POST',
  url: '/login',
  data
})

// 验证码登录
export const loginByCaptcha = data => request({
  method: 'POST',
  url: '/login/mobile',
  data
})

// 获取用户页信息
export const getUserInfo = () => request({
  method: 'GET',
  url: '/user'
})
