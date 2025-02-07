<script setup lang="ts">
import { RouterLink } from 'vue-router'

const addBlog = () => {
  console.log('Hello')
}
</script>

<template>
  <div class="mx-auto my-10 flex justify-center items-center" style="height: 80vh">
    <img src="@/assets/img/blog.png" alt="Login" class="h-96" />
    <div class="shadow-2xl p-10 m-10 rounded rounded-3xl">
      <h2 class="main-title">Create New Blog</h2>
      <p class="semi-title">
        Share your ideas, insights, and stories with the world.
        <RouterLink to="/" class="link"> Back to Home</RouterLink>
      </p>

      <form @submit.prevent="addBlog">
        <div>
          <label for="title" class="label">Title</label>
          <input type="text" id="title" class="input" placeholder="Enter Your Title" />
        </div>

        <div>
          <label for="blog" class="label">Blog Description</label>
          <textarea
            id="blog"
            class="input h-40"
            placeholder="Enter Your Blog Description"
          ></textarea>
        </div>

        <button type="submit" class="button mt-10">Add Blog</button>
      </form>
    </div>
  </div>
</template>
