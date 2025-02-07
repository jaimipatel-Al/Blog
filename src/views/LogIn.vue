<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isPassword: boolean = ref(false)
const login = () => {
  console.log('Hello')
}
</script>

<template>
  <div class="container mx-auto my-10 flex justify-center space-x-10" style="height: 80vh">
    <div class="shadow-2xl p-10 m-10 rounded rounded-3xl">
      <h2 class="main-title">Login</h2>
      <p class="semi-title">
        Doesn't have an account yet?
        <RouterLink to="/signup" class="link">Sign Up</RouterLink>
      </p>

      <form @submit.prevent="login">
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

        <div class="flex items-center space-x-3 my-10 text-lg text-gray-500 font-semibold">
          <input type="checkbox" id="remember" class="w-6 h-6 cursor-pointer" />
          <label for="remember">Remember Me</label><br />
        </div>

        <button type="submit" class="button">Login</button>
      </form>
    </div>
    <img src="@/assets/img/login.png" alt="Login" />
  </div>
</template>
