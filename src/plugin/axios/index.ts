import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const instance = axios.create({
  baseURL: 'https://social-media-backend-bwrz.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  const token = authStore.token

  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})

export default instance
