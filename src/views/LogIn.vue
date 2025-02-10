<script setup lang="ts">
import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/vue/24/solid'
import { RouterLink, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import Axios from '@/plugin/axios'
import api from '@/plugin/apis'
import toast from '@/plugin/toast'
import { useAuthStore } from '@/stores/authStore'

const schema = yup.object({
  Email: yup.string().required().email(),
  Password: yup
    .string()
    .required()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
})

const router = useRouter()
const authStore = useAuthStore()

const isRemember = ref(false)
const isPassword = ref(false)
const isLogin = ref(false)
const userName = ref('')
const password = ref('')

const login = async () => {
  isLogin.value = true

  const credentials = {
    userName: userName.value,
    password: password.value,
  }

  await Axios.post(api.login, credentials)
    .then((response) => {
      const res = response.data

      authStore.loginUser(credentials)
      authStore.storeToken(res.data.token)

      if (isRemember.value) authStore.sessionStore(credentials)
      else authStore.sessionRemove()

      toast.success(res?.message ?? 'User Login Success!')
      router.push('/')
    })
    .catch((er) => {
      toast.error(er?.response?.data?.message ?? "User Can't Login!")
    })
    .finally(() => {
      isLogin.value = false
    })
}

onMounted(() => {
  const authCredentials = sessionStorage.getItem('authCredentials')

  if (authCredentials) {
    const credentials = JSON.parse(authCredentials)
    userName.value = credentials.userName
    password.value = credentials.password
    isRemember.value = true
  }
})
</script>

<template>
  <div class="container mx-auto my-10 flex justify-center space-x-10" style="height: 80vh">
    <div class="shadow-2xl p-10 m-10 rounded rounded-3xl">
      <h2 class="main-title">Login</h2>
      <p class="semi-title">
        Doesn't have an account yet?
        <RouterLink to="/signup" class="link">Sign Up</RouterLink>
      </p>

      <Form @submit="login" :validation-schema="schema" v-slot="{ errors }">
        <div>
          <label for="mail" class="label">Email Address</label>
          <Field
            v-model="userName"
            type="email"
            name="Email"
            id="email"
            class="input"
            placeholder="Enter Your Email Address"
          />
          <p class="error-message">{{ errors?.Email }}</p>
        </div>

        <div>
          <label for="password" class="label">Password</label>
          <div class="input flex items-center justify-between">
            <Field
              v-model="password"
              :type="isPassword ? 'text' : 'password'"
              name="Password"
              id="password"
              class="text-gray-900 placeholder:text-gray-400 focus:outline-none text-xl w-full"
              placeholder="Enter Your Password"
            />
            <div class="pl-2" @click="isPassword = !isPassword">
              <EyeSlashIcon v-if="isPassword" class="password-icon" />
              <EyeIcon v-else class="password-icon" />
            </div>
          </div>
          <p class="error-message">{{ errors?.Password }}</p>
        </div>

        <div class="flex items-center space-x-3 my-10 text-lg text-gray-500 font-semibold">
          <input
            v-model="isRemember"
            type="checkbox"
            id="remember"
            class="w-6 h-6 cursor-pointer"
          />
          <label for="remember">Remember Me</label><br />
        </div>

        <button type="submit" class="button" :disabled="isLogin">
          Login <ArrowPathIcon v-if="isLogin" class="w-6 mx-3" />
        </button>
      </Form>
    </div>
    <img src="@/assets/img/login.png" alt="Login" />
  </div>
</template>
