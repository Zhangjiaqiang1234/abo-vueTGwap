import axios from 'axios'
// 获取图形验证码
export const getCaptcha = () => {
  var url = '/cf/captcha.jpg'
  return axios.get(url, {
    responseType: 'blob'
  })
}
// 获取短信验证码
export const getSMSCaptcha = (data) => {
  var url = '/api/common/send/sms'
  return axios.post(url, data)
}

// 登陆
export const login = (data) => {
  var url = '/api/candy/login'
  return axios.post(url, data)
}

// 手机号注册查询
export const checkPhone = (data) => {
  var url = '/api/export/contains/phone'
  return axios.post(url, data)
}

// 注册
export const register = (data) => {
  var url = '/api/candy/register'
  return axios.post(url, data)
}
// 忘记密码
export const forget = (data) => {
  var url = '/api/users/captcha/update/pwd'
  return axios.post(url, data)
}
// 获取登录用户信息
export const userInfo = (data) => {
  var url = '/api/candy/info/' + data
  return axios.get(url, {
    headers: {'x-auth-token': sessionStorage.getItem('x-auth-token')}
  })
}

// 激活
export const active = (data) => {
  var url = '/api/candy/admin/activation'
  return axios.post(url, data, {
    headers: {'x-auth-token': sessionStorage.getItem('x-auth-token')}
  })
}

// 查询所有糖果用户
export const getAllUserInfo = (data) => {
  var url = '/api/candy/admin/list'
  return axios.post(url, data, {
    headers: {'x-auth-token': sessionStorage.getItem('x-auth-token')}
  })
}
