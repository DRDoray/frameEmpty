import Vue from 'vue'
import VueRouter from 'vue-router'
import { projectTitle } from '@/config'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Test from '@/views/testFolder/Test.vue'
import Demo from '@/views/testFolder/Demo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '登录',
      requireAuth: false, // 是否需要权限
      hidden: true
    }
  },
  {
    path: '/demo',
    name: 'Demo',
    component: About,
    meta: {
      title: 'demo案例',
      requireAuth: true,
      hidden: false,
      one: true
    },
    children: [
      {
        path: '/demo',
        name: 'Demo',
        component: Demo,
        meta: {
          title: 'demo案例',
          requireAuth: true,
          hidden: false
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    leaf: false,
    meta: {
      title: '测试',
      requireAuth: true, // 是否需要权限
      hidden: false,
      one: false
    },
    redirect: '/test',
    children: [
      {
        path: '/test',
        name: 'Test',
        component: Test,
        meta: {
          title: '测试信息',
          requireAuth: true, // 是否需要权限
          hidden: false
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

// 路由钩子,导航之前
router.beforeEach(async (to, from, next) => {
  // Loading.service() // 开启页面loging状态
  // const userId = getStorageItem('userId')
  const userId = '123'
  // 防止刷新页面之后用户信息丢失
  // if (userId && !store.state.user) {
  //   await store.dispatch('fetchUserBeforeRoute', userId)
  // }
  // 判断目的路由是否需要登陆授权
  if (to.matched.some(record => record.meta.requireAuth) && !userId) {
    next({
      name: 'Home',
      query: {
        redirect: to.fullPath // 登陆之后需要重定向的路由路径
      }
    })
  } else {
    next()
  }
})

// 进入路由后设置文档标题
router.afterEach((to) => {
  document.title = to.matched.reduce((acc, cur) => cur.meta.title || acc, projectTitle)
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
