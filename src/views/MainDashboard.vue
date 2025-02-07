
<script setup lang="ts">
import { PlusIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'

const router = useRouter()

const createBlog = () => {
  router.push('/add-blog')
}

const logout = () => {
  console.log('Hello')
}
</script>

<template>
  <main class="bg w-screen h-screen relative">
    <nav
      class="bg-white shadow shadow-2xl flex justify-between items-center"
      style="height: 8vh; min-height: 50px"
    >
      <h1 class="text-5xl mx-10 font-bold text-blue-900">Write Blog</h1>
      <ArrowLeftStartOnRectangleIcon
        class="w-14 mx-5 p-3 rounded rounded-full cursor-pointer hover:bg-blue-50"
        @click="logout()"
      />
    </nav>
    <button
      class="button rounded rounded-full w-20 absolute bottom-5 right-5"
      @click="createBlog()"
    >
      <PlusIcon />
    </button>
  </main>
</template>
