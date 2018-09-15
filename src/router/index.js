import Vue from 'vue'
import Router from 'vue-router'

import '@/assets/scss/index.css'

import Home from '@/components/Home/Home'
import FlowerList from '@/components/Flower/FlowerList'
import FlowerDetail from '@/components/Flower/FlowerDetail'
import PhotoList from '@/components/Photo/PhotoList'
import PhotoDetail from '@/components/Photo/PhotoDetail'

// 注册全局组件 router-view router-link

// 未来所有组件中的this对象，就具备该属性，所有的this
// 其实就是Vue的子类对象
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 首先进行重定向
      path: '/',
      redirect: {
        name: 'home'
      },
      meta: {
        navShow: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        navShow: true
      }
    },
    // 鲜花列表
    {
      path: '/flower/list',
      name: 'flower.list',
      component: FlowerList,
      meta: {
        navShow: false
      }
    },
    // 鲜花详情
    {
      path: '/flower/detail/:id',
      name: 'flower.detail',
      component: FlowerDetail,
      meta: {
        navShow: false
      }
    },
    // 图文列表
    {
      path: '/photo/list/:categoryId',
      name: 'photo.list',
      component: PhotoList
    },
    // 图文详情
    {
      path: '/photo/detail',
      name: 'photo.detail',
      component: PhotoDetail
    }
  ]
})
