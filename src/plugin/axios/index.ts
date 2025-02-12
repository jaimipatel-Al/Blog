import axios from 'axios'

import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
const token = authStore.token

const instance = axios.create({
  baseURL: 'https://social-media-backend-bwrz.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  },
})

export default instance
