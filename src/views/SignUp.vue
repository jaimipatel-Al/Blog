<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isPassword: boolean = ref(false)
const isCPassword: boolean = ref(false)
const signup = () => {
  console.log('Hello')
}
</script>

<template>
  <div class="container mx-auto my-10 flex justify-center space-x-10" style="height: 80vh">
    <div class="shadow-2xl py-6 my-4 px-10 mx-10 rounded rounded-3xl w-full">
      <h2 class="text-5xl text-gray-900 font-bold">Sign Up</h2>
      <p class="text-gray-500 font-semibold text-lg my-2">
        Already have an account?
        <RouterLink to="/login" class="underline text-blue-700">Login</RouterLink>
      </p>

      <form @submit.prevent="signup">
        <div>
          <label for="email" class="label">Email Address</label>
          <input type="text" id="email" class="input" placeholder="Enter Your Email Address" />
        </div>

        <div>
          <label for="password" class="label">Password</label>
          <div class="input flex items-center justify-between">
            <input
              :type="isPassword ? 'text' : 'password'"
              id="password"
              class="text-gray-900 placeholder:text-gray-400 focus:outline-none text-xl w-full"
              placeholder="Enter Your Password"
            />
            <div class="pl-2" @click="isPassword = !isPassword">
              <EyeSlashIcon v-if="isPassword" class="password-icon" />
              <EyeIcon v-else class="password-icon" />
            </div>
          </div>
        </div>

        <div>
          <label for="cPassword" class="label">Confirm Password</label>
          <div class="input flex items-center justify-between">
            <input
              :type="isCPassword ? 'text' : 'password'"
              id="cPassword"
              class="text-gray-900 placeholder:text-gray-400 focus:outline-none text-xl"
              placeholder="Enter Your Confirm Password"
            />
            <div class="pl-2" @click="isCPassword = !isCPassword">
              <EyeSlashIcon v-if="isCPassword" class="password-icon" />
              <EyeIcon v-else class="password-icon" />
            </div>
          </div>
        </div>

        <button
          class="mt-10 bg-blue-700 text-2xl font-bold text-white p-5 w-full rounded rounded-lg hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          Sign Up
        </button>
      </form>
    </div>
    <img src="@/assets/img/signup.png" alt="Login" />
  </div>
</template>
