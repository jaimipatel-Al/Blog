<script setup>
  import { ArrowPathIcon } from '@heroicons/vue/24/solid'
  import { RouterLink, useRoute, useRouter } from 'vue-router'
  import { Form, Field } from 'vee-validate'
  import * as yup from 'yup'
  import { computed, ref, watch } from 'vue'
  import Axios from '@/plugin/axios'
  import api from '@/plugin/apis'
  import toast from '@/plugin/toast'

  const schema = yup.object({
    Title: yup.string().required().min(5).max(100),
    Description: yup.string().required().min(10).max(1000),
  })

  const router = useRouter()
  const route = useRoute()

  const id = computed(() => route?.params?.id)

  const title = ref('')
  const description = ref('')
  const isLoading = ref(false)
  const isGettingPost = ref(false)

  const addBlog = async () => {
    isLoading.value = true

    const post = {
      title: title.value,
      description: description.value,
    }

    await Axios.post(api.addPost, post)
      .then((response) => {
        const res = response.data

        toast.success(res?.message ?? 'Post Created Success!')
        router.push('/')
      })
      .catch((er) => {
        toast.error(er?.response?.data?.message ?? "Post Can't Create!")
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const editBlog = async () => {
    isLoading.value = true

    const post = {
      title: title.value,
      description: description.value,
    }

    await Axios.put(`${api.editPost}${id.value}`, post)
      .then((response) => {
        const res = response.data

        toast.success(res?.message ?? 'Post Updated Success!')
        router.push('/')
      })
      .catch((er) => {
        toast.error(er?.response?.data?.message ?? "Post Can't Updating!")
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const getPostDetail = async () => {
    isGettingPost.value = true

    await Axios.get(`${api.getPost}${id.value}`)
      .then((response) => {
        const res = response.data.data
        title.value = res.title
        description.value = res.description
      })
      .catch((er) => {
        console.log(er)
      })
      .finally(() => {
        isGettingPost.value = false
      })
  }

  watch(
    id,
    () => {
      if (id.value) getPostDetail()
    },
    { immediate: true }
  )
</script>

<template>
  <div class="mx-auto may-10 flex justify-center items-center" style="height: 80vh">
    <img src="@/assets/img/blog.png" alt="Login" class="h-96 hidden sm:block" />
    <div class="shadow-2xl pa-10 ma-10 rounded rounded-3xl">
      <h2 class="main-title">{{ id ? 'Update Your ' : 'Create New ' }} Blog</h2>
      <p class="semi-title">
        Share your ideas, insights, and stories with the world.
        <RouterLink to="/" class="link"> Back to Home</RouterLink>
      </p>

      <Form @submit="id ? editBlog() : addBlog()" :validation-schema="schema" v-slot="{ errors }">
        <div>
          <label for="title" class="label">Title</label>
          <p v-if="isGettingPost" class="bg-gray-200 mb-4 h-14 w-full rounded-md animate-pulse"></p>
          <Field v-else v-model="title" type="text" id="title" class="input" placeholder="Enter Your Title"
            name="Title" />
          <p v-if="!isGettingPost" class="error-message">{{ errors?.Title }}</p>
        </div>

        <div>
          <label for="blog" class="label">Blog Description</label>
          <p v-if="isGettingPost" class="bg-gray-200 mb-10 h-40 w-full rounded-md animate-pulse"></p>
          <Field v-else v-model="description" v-slot="{ field }" name="Description">
            <textarea v-bind="field" id="blog" class="input h-40" placeholder="Enter Your Blog Description"></textarea>
          </Field>
          <p v-if="!isGettingPost" class="error-message">{{ errors?.Description }}</p>
        </div>

        <button type="submit" class="button mt-10" :disabled="isLoading || isGettingPost">
          {{ id ? 'Edit' : 'Add' }} Blog
          <ArrowPathIcon v-if="isLoading" class="w-6 mx-3" />
        </button>
      </Form>
    </div>
  </div>
</template>
