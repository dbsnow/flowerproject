// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 配置axios
import Axios from 'axios'
// 配置MintUI
import MintUI from 'mint-ui'
// 引入css
import 'mint-ui/lib/style.css'

// 引入图标的css
import './assets/ttf/iconfont.css'
// 引入自己的css
import './assets/css/global.css'

// 引入ul，li组件
import MyUl from '@/components/Common/MyUl'
import MyLi from '@/components/Common/MyLi'

import Moment from 'moment'
import NavBar from '@/components/Common/NavBar'

// 图片预览插件
import VuePreview from 'vue-preview'

import Comment from '@/components/Common/Comment'

// 注册全局组件
Vue.component(MyUl.name, MyUl)
Vue.component(MyLi.name, MyLi)
Vue.component(NavBar.name, NavBar)
Vue.component(Comment.name, Comment)

// 设置中文显示
Moment.locale('zh-cn')
// 定义全局日期组件过滤器
// {{'xxx' | covertTime('yyyy-mm-dd')}}
// {{'xxx' | covertTime('yyyy年mm月dd日')}}
Vue.filter('convertTime', function (data, formatStr) {
  return Moment(data).format(formatStr)
})
Vue.filter('relativeTime', function (previousTime) {
  return Moment(previousTime).fromNow()
})

// default install
// 内部运行 vue.component
Vue.use(VuePreview)
Vue.component('vue-preview', VuePreview)

// 配置公共URL
// Axios.defaults.baseURL = 'https://www.sinya.online/api/'
Vue.prototype.$axios = Axios

// 配置请求拦截器，显示loading图标
Axios.interceptors.request.use(function (config) {
  MintUI.Indicator.open({
    text: '加载中...'
  })
  return config
})
// 配置响应拦截器，关闭loading图标
Axios.interceptors.response.use(function (response) {
  // response.config类似上面config
  MintUI.Indicator.close()
  return response
})

//  安装插件 注册全局组件及挂载属性
Vue.use(MintUI);

(() => new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}))()
