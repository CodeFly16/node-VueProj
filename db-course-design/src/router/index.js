import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Login',
    redirect: '/login'
  },

  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main'),
    children: [
      {path: '/testSix/readerCategory', component: () => import( '../views/testSix/ReaderCategory.vue')},
      {path: '/testSix/libraryManagement', component: () => import( '../views/testSix/LibraryManagement.vue')},
      {path: '/testSix/readerManagement', component: () => import( '../views/testSix/ReaderManagement.vue')},
    ]
  }
  /* {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
   }*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const tokenStr = localStorage.getItem('token')
  if (to.meta.isPublic) return next()
  if (!to.meta.isPublic && !tokenStr && ['/', '/login'].indexOf(to.path) === -1) {
    Vue.prototype.$message.error("请先登录")
    return next('/login')
  }
  next()
})


export default router
