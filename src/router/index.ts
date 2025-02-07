import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LogIn.vue'),
      meta: { auth: false },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/views/SignUp.vue'),
      meta: { auth: false },
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/MainDashboard.vue'),
      meta: { auth: true },
    },
    {
      path: '/add-blog',
      name: 'Add-Blog',
      component: () => import('@/views/AddEditBlog.vue'),
      meta: { auth: true },
    },
    {
      path: '/edit-blog/:id',
      name: 'Edit-Blog',
      component: () => import('@/views/AddEditBlog.vue'),
      meta: { auth: true },
    },
  ],
})

const currentUser = () => {
  return new Promise((resolve, reject) => {
    const authStore = useAuthStore()
    const token = authStore.userData
    resolve(token)
    reject
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (await currentUser()) next()
    else next('/login')
  } else next()
})

export default router
