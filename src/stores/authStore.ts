import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('user', () => {
  interface loginCredentials {
    userName: string
    password: string
    userId: string
  }

  interface sessionCredentials {
    userName: string
    password: string
  }

  const userData = ref(JSON.parse(localStorage.getItem('blogUser') || '{}'))
  const token = ref(localStorage.getItem('token'))

  const loginUser = (credentials: loginCredentials) => {
    userData.value = credentials
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

  const sessionStore = (credentials: sessionCredentials) => {
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
