<script setup>
  import { PlusIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/24/solid'
  import { useRouter } from 'vue-router'
  import BlogPosts from '@/components/BlogPosts.vue'
  import { useAuthStore } from '@/stores/authStore'
  import toast from '@/plugin/toast'

  const router = useRouter()
  const authStore = useAuthStore()

  const createBlog = () => {
    router.push('/add-blog')
  }

  const logout = () => {
    authStore.logOut()
    authStore.removeToken()
    toast.success('User Logged Out successfully')
    router.push('/login')
  }
</script>

<template>
  <main class="bg w-screen h-screen relative">
    <nav class="bg-white shadow shadow-2xl flex justify-between items-center" style="height: 8vh; min-height: 50px">
      <h1 class="text-3xl sm:text-4xl md:text-5xl max-10 font-bold text-blue-900">Write Blog</h1>
      <div
        class="flex items-center text-base sm:text-lg md:text-xl font-semibold mx-5 py-3 px-5 rounded rounded-full hover:bg-blue-50 cursor-pointer"
        @click="logout()">
        <ArrowLeftStartOnRectangleIcon class="w-6 sm:w-8 md:w-10" />
        Logout
      </div>
    </nav>
    <BlogPosts />
    <button class="button rounded rounded-full w-12 sm:w-16 lg:w-20 absolute bottom-16 sm:bottom-5 right-3 sm:right-5"
      @click="createBlog()">
      <PlusIcon />
    </button>
  </main>
</template>
