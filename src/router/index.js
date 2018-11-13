import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import Account from '@/views/account'
import Register from '@/views/register/index'
import Forget from '@/views/forget/index'
import App from '@/views/App'
import DownLoad from '@/views/DownLoad'
import News from '@/views/News'
import Manager from '@/views/Manager'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register,
      meta: {
        title: '注册即可领取20abo'
      }
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        title: 'ABO'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: '注册即可领取20abo'
      }
    },
    {
      path: '/register/:id',
      name: 'register',
      component: Register,
      meta: {
        title: '注册即可领取20abo'
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget,
      meta: {
        title: '注册即可领取20abo'
      }
    },
    {
      path: '/app',
      name: 'app',
      component: App,
      meta: {
        title: '注册即可领取20abo'
      }
    },
    {
      path: '/downLoad',
      name: 'downLoad',
      component: DownLoad,
      meta: {
        title: 'ABO'
      }
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      meta: {
        title: 'ABO'
      }
    },
    {
      path: '/news/:id',
      name: 'news',
      component: News,
      meta: {
        title: 'ABO'
      }
    },
    {
      path: '/manager',
      name: 'manager',
      component: Manager,
      meta: {
        title: 'ABO后台管理'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // Change doc title
  document.title = to.meta.title
  next()
})
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(res => res.meta.requireLogin)) {
//     console.log(11111111111111)
//     // 判断是否需要登录权限
//     if (document.cookie) {
//       next()
//     } else {
//       Message({
//         showClose: true,
//         message: '登录状态信息过期,请重新登录',
//         type: 'error'
//       })
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router
