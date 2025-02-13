import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const currentUser = () => {
  return new Promise((resolve) => {
    const authStore = useAuthStore()
    const token = authStore.token
    resolve(token)
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (await currentUser()) next()
    else next('/login')
  } else next()
})

export default router
