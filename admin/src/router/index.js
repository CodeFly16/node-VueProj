import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', name: 'login', component: () => import('../views/Login.vue'), meta: {isPublic: true}
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {path: '/categories/create', component: () => import( '../views/Category/CategoryEdit.vue')},
      {path: '/categories/list', component: () => import( '../views/Category/CategoryList.vue')},
      {path: '/categories/edit/:id', component: () => import( '../views/Category/CategoryEdit.vue'), props: true},

      {path: '/items/create', component: () => import( '../views/Item/ItemEdit.vue')},
      {path: '/items/list', component: () => import( '../views/Item/ItemList.vue')},
      {path: '/items/edit/:id', component: () => import( '../views/Item/ItemEdit.vue'), props: true},

      {path: '/heroes/create', component: () => import( '../views/Hero/HeroEdit.vue')},
      {path: '/heroes/list', component: () => import( '../views/Hero/HeroList.vue')},
      {path: '/heroes/edit/:id', component: () => import( '../views/Hero/HeroEdit.vue'), props: true},

      {path: '/articles/create', component: () => import( '../views/Article/ArticleEdit.vue')},
      {path: '/articles/list', component: () => import( '../views/Article/ArticleList.vue')},
      {path: '/articles/edit/:id', component: () => import( '../views/Article/ArticleEdit.vue'), props: true},

      {path: '/ads/create', component: () => import( '../views/Advertisement/AdEdit.vue')},
      {path: '/ads/list', component: () => import( '../views/Advertisement/AdList.vue')},
      {path: '/ads/edit/:id', component: () => import( '../views/Advertisement/AdEdit.vue'), props: true},

      {path: '/admin_users/create', component: () => import( '../views/AdminUser/AdminUserEdit.vue')},
      {path: '/admin_users/list', component: () => import( '../views/AdminUser/AdminUserList.vue')},
      {path: '/admin_users/edit/:id', component: () => import( '../views/AdminUser/AdminUserEdit.vue'), props: true},
    ]
  },
]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const tokenStr = localStorage.getItem('token')
  if (to.meta.isPublic) return next()
  if (!to.meta.isPublic && !tokenStr) {
    Vue.prototype.$message.error("请先登录")
    return next('/login')
  }
  next()
})

export default router
