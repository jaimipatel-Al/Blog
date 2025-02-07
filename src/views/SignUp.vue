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
      <h2 class="main-title">Sign Up</h2>
      <p class="semi-title">
        Already have an account?
        <RouterLink to="/login" class="link">Login</RouterLink>
      </p>

      <form @submit.prevent="signup">
        <div>
          <label for="email" class="label">Email Address</label>
          <input type="email" id="email" class="input" placeholder="Enter Your Email Address" />
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

        <button type="submit" class="mt-10 button">Sign Up</button>
      </form>
    </div>
    <img src="@/assets/img/signup.png" alt="Login" />
  </div>
</template>
