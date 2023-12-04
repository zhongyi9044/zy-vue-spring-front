import { createRouter, createWebHistory } from "vue-router"
import LoginVue from "@/views/Login/Login.vue"
import HomeVue from "@/views/Home/Home.vue"
import ArticleCategory from '@/views/Article/ArticleCategory.vue'
import ArticleManage from '@/views/Article/ArticleManage.vue'
import UserAvatar from '@/views/User/UserAvatar.vue'
import UserInfo from '@/views/User/UserInfo.vue'
import UserResetPassword from '@/views/User/UserResetPassword.vue'

// 路由关系
const routes = [
  {
    path: '/',
    component: HomeVue,
    name:HomeVue,
    children: [
      {
        path: '/',
        component: ArticleCategory,
        name:ArticleCategory
      },
      {
        path: '/article/manage',
        component: ArticleManage,
        name:ArticleManage
      },
      {
        path: '/user/avatar',
        component: UserAvatar,
        name:UserAvatar
      },
      {
        path: '/user/info',
        component: UserInfo,
        name:UserInfo
      },
      {
        path: '/user/resetPassword',
        component: UserResetPassword,
        name:UserResetPassword
      }
    ]
  },
  {
    path: '/login',
    component: LoginVue,
    name:LoginVue
  },

]

// 路由器
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

// 导出
export default router