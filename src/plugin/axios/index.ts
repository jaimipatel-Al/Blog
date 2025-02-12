import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const instance = axios.create({
  baseURL: 'https://social-media-backend-bwrz.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: authStore.token ? `Bearer ${authStore.token}` : '',
  },
})

export default instance
