import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import router from '../router'

const Axios = axios.create({
  baseURL: 'http://112.74.58.173:8082', //  因为我本地做了反向代理
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

let cancel
let promiseArr = {}
const CancelToken = axios.CancelToken
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]('操作取消')
      promiseArr[config.url] = cancel
    } else {
      promiseArr[config.url] = cancel
    }
    if (config.method === 'post') {
      // 序列化
      config.data = qs.stringify(config.data)
    }

    // 若是有做鉴权token , 就给头部带上token
    // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
    // if (!document.cookie) {
    //   this.$router.push('/login')
    // }
    return config
  }, error => {
    return Promise.reject(error)
  })

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  switch (response.status) {
    case 200: return response
  }
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 302:
        return err.response
        // window.location = '/login'
      case 1002:
        err.message = '短信发送失败'
        break
      case 1003:
        err.message = '手机号码或密码错误'
        break
      case 1004:
        err.message = '用户不存在'
        break
      case 1005:
        err.message = '密码不符合要求'
        break
      case 1006:
        err.message = '请求超时'
        break
      case 1007:
        err.message = '服务器端出错'
        break
      case 1008:
        err.message = '网络未实现'
        break
      case 403:
        err.message = '网络错误'
        break
      case 1009:
        err.message = '服务不可用'
        break
      case 401:
        err.message = '网络超时'
        break
      case 1010:
        err.message = 'http版本不支持该请求'
        break
      case 500:
        err.message = 'http版本不支持该请求'
        break
      case 1011:
        err.message = 'http版本不支持该请求'
        break
      case 1012:
        err.message = 'http版本不支持该请求'
        break
      case 1610:
        err.message = 'http版本不支持该请求'
        break
      case 1611:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
  } else {
    err.message = '连接到服务器失败'
  }
  return Promise.resolve(err)
})

export default axios
// // get 请求
// get (url, param) {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: 'get',
//       url,
//       params: param,
//       cancelToken: new CancelToken(c => {
//         cancel = c
//       })
//     }).then(res => {
//       resolve(res)
//     })
//   })
// },
// // post请求
// post (url, param) {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: 'post',
//       url,
//       data: param,
//       cancelToken: new CancelToken(c => {
//         cancel = c
//       })
//     }).then(res => {
//       resolve(res)
//     })
//   })
// }
