import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LogIn.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/views/SignUp.vue'),
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/MainDashboard.vue'),
    },
    {
      path: '/add-blog',
      name: 'Add-Blog',
      component: () => import('@/views/AddBlog.vue'),
    },
  ],
})

export default router
