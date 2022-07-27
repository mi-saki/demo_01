import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入需要的组件
import Home from '../views/Home/Home.vue'
import User from '../views/User/User.vue'
import Login from '@/views/Login/Login.vue'

// 将VueRouter安装为Vue的插件
Vue.use(VueRouter)

// 路由数组的规则
const routes = [
  // 定义首页路由规则
  { path: '/', component: Home },
  // 定义我的路由规则
  { path: '/user', component: User },
  // 带有 name 名称的路由规则，叫做“命名路由”
  { path: '/login', component: Login, name: 'login' },
]

// 创建VueRouter的路由实例
const router = new VueRouter({
  routes,
})

export default router
