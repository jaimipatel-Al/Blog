import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('user', () => {
  const userData = ref(JSON.parse(localStorage.getItem('blogUser')))
  const token = ref(localStorage.getItem('token'))

  const loginUser = (credentials) => {
    userData.value = JSON.stringify(credentials)
    localStorage.setItem('blogUser', JSON.stringify(userData.value))
  }

  const storeToken = (val: string) => {
    token.value = val
    localStorage.setItem('token', val)
  }

  const removeToken = () => {
    token.value = ''
    localStorage.removeItem('token')
  }

  const logOut = () => {
    userData.value = null
    localStorage.removeItem('blogUser')
  }

  const sessionStore = (credentials) => {
    sessionStorage.setItem('authCredentials', JSON.stringify(credentials))
  }

  const sessionRemove = () => {
    sessionStorage.removeItem('authCredentials')
  }

  return {
    userData,
    token,
    loginUser,
    storeToken,
    removeToken,
    logOut,
    sessionStore,
    sessionRemove,
  }
})
