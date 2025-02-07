<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  Title: yup.string().required().min(5).max(100),
  Description: yup.string().required().min(10).max(1000),
})

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

      <Form @submit="addBlog" :validation-schema="schema" v-slot="{ errors }">
        <div>
          <label for="title" class="label">Title</label>
          <Field type="text" id="title" class="input" placeholder="Enter Your Title" name="Title" />
          <p class="error-message">{{ errors?.Title }}</p>
        </div>

        <div>
          <label for="blog" class="label">Blog Description</label>
          <Field v-slot="{ field }" name="Description">
            <textarea
              v-bind="field"
              id="blog"
              class="input h-40"
              placeholder="Enter Your Blog Description"
            ></textarea>
          </Field>
          <p class="error-message">{{ errors?.Description }}</p>
        </div>

        <button type="submit" class="button mt-10">Add Blog</button>
      </Form>
    </div>
  </div>
</template>
