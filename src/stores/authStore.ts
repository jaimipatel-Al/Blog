import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('user', () => {
  const userData = ref(JSON.parse(localStorage.getItem('blogUser')))

  const loginUser = (email: string, password: string) => {
    const user = { email: email, password: password }
    userData.value = JSON.stringify(user)
    localStorage.setItem('blogUser', JSON.stringify(userData.value))
  }

  const logOut = () => {
    userData.value = null
    localStorage.removeItem('blogUser')
  }

  const registerUser = (email: string, password: string) => {
    const user = { email: email, password: password }
    userData.value = JSON.stringify(user)
    localStorage.setItem('blogUser', JSON.stringify(userData.value))
  }

  return {
    userData,
    loginUser,
    logOut,
    registerUser,
  }
})
