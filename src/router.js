import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
import HomeDescr from './components/home-components/HomeDescr'
import Editor from './components/editor/Editor'
import NotFound from './components/NotFound'

const routes = [
  { path: '/signin', component: Signin },
  { path: '/signup', component: Signup },
  { path: '/',
    component: Home,
    children: [
      { path: '', component: HomeDescr }
    ],
    meta: { requiresAuth: true }
  },
  { path: '/editor',
    component: Editor,
    meta: { requiresAuth: true } },
  { path: '*', component: NotFound }
]

/* const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
}) */

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/signin')
  } else {
    next()
  }
})

export default router
