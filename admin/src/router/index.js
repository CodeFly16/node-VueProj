import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
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
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
