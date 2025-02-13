<script setup lang="ts">
import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/vue/24/solid'
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
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
  ConfirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('Password'), ''], 'Passwords must match'),
})

const router = useRouter()
const authStore = useAuthStore()

const isSignup = ref(false)
const isPassword = ref(false)
const isConfirmPassword = ref(false)
const userName = ref('')
const password = ref('')
const confirmPassword = ref('')

const signup = async () => {
  isSignup.value = true

  const credentials = {
    userName: userName.value,
    password: password.value,
  }

  await Axios.post(api.signUp, credentials)
    .then((response) => {
      const res = response.data

      authStore.sessionStore(credentials)

      toast.success(res?.message ?? 'User Sign Up Success!')
      router.push('/login')
    })
    .catch((er) => {
      toast.error(er?.response?.data?.message ?? "User Can't Sign Up!")
    })
    .finally(() => {
      isSignup.value = false
    })
}
</script>

<template>
  <div class="container mx-auto my-10 flex justify-center space-x-10" style="height: 80vh">
    <div class="shadow-2xl py-6 my-4 px-10 mx-10 rounded rounded-3xl w-2/5">
      <h2 class="main-title">Sign Up</h2>
      <p class="semi-title">
        Already have an account?
        <RouterLink to="/login" class="link">Login</RouterLink>
      </p>

      <Form @submit="signup" :validation-schema="schema" v-slot="{ errors }">
        <div>
          <label for="email" class="label">Email Address</label>
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

        <div>
          <label for="ConfirmPassword" class="label">Confirm Password</label>
          <div class="input flex items-center justify-between">
            <Field
              v-model="confirmPassword"
              :type="isConfirmPassword ? 'text' : 'password'"
              name="ConfirmPassword"
              id="ConfirmPassword"
              class="text-gray-900 placeholder:text-gray-400 focus:outline-none text-xl w-full"
              placeholder="Enter Your Confirm Password"
            />
            <div class="pl-2" @click="isConfirmPassword = !isConfirmPassword">
              <EyeSlashIcon v-if="isConfirmPassword" class="password-icon" />
              <EyeIcon v-else class="password-icon" />
            </div>
          </div>
          <p class="error-message">{{ errors?.ConfirmPassword }}</p>
        </div>

        <button type="submit" class="mt-10 button" :disabled="isSignup">
          Sign Up<ArrowPathIcon v-if="isSignup" class="w-6 mx-3" />
        </button>
      </Form>
    </div>
    <img src="@/assets/img/signup.png" alt="Sign Up" />
  </div>
</template>
