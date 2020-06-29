import Vue from 'vue'
import Router from 'vue-router'
import cookieHandler from "@/cookie";
import Home from './components/Home.vue'
import Form from './components/Form.vue'
import Form2 from './components/Form2.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Detail from './components/Detail.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/form',
      name: 'form',
      component: Form,
      meta: { 
        requiresAuth: true
      }
    },
    {
        path: '/form2',
        name: 'form2',
        component: Form2,
        meta: { 
          requiresAuth: true
        }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: { 
        requiresAuth: true
      }
  },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (cookieHandler.isLoggedIn()) {
      next()
      return
    }
    next('/login') 
  } else {
    if (cookieHandler.isLoggedIn()) {
      next('/')
      return
    }
    next() 
  }
})

export default router