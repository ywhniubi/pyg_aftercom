import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import users from '@/components/users'
import role from '@/components/role'
import power from '@/components/power'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: '/users',
          component: users
        },
        {
          path: '/role',
          component: role
        },
        {
          path: '/power',
          component: power
        }
      ]
    }
  ]
})

// to去哪
// from从哪来
// next()去哪个页面
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})
export default router
