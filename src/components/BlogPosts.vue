<script setup lang="ts">
import {
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  XMarkIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/vue/24/outline'
import CommentBox from '@/components/CommentBox.vue'
import PostComment from '@/components/PostComment.vue'
import { onMounted, ref } from 'vue'
import Axios from '@/plugin/axios'
import api from '@/plugin/apis'
import { formatDate } from '@/composables/format'
import toast from '@/plugin/toast'

const isComment = ref(false)
const isLoading = ref(false)
const isCommentLoading = ref(false)
const posts = ref([])

const getPost = async () => {
  isLoading.value = true

  await Axios.get(api.postList)
    .then((response) => {
      const res = response.data
      posts.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      isLoading.value = false
    })
}

const addComment = async (id: string, text: string) => {
  isCommentLoading.value = true

  const comment = {
    postId: id,
    text: text,
  }

  await Axios.post(api.addComment, comment)
    .then((response) => {
      const res = response.data
      toast.success(res?.message ?? 'Comment Post Success!')
      return true
    })
    .catch((er) => {
      toast.error(er?.response?.data?.message ?? "Comment Can't Post!")
      return false
    })
    .finally(() => {
      isCommentLoading.value = false
    })
}

onMounted(() => {
  getPost()
})
</script>

<template>
  <div class="w-full overflow-y-auto" style="height: 88vh">
    <div
      v-if="isLoading"
      class="flex justify-center items-center text-xl font-semibold m-10 text-gray-500"
    >
      <ArrowPathIcon class="w-12 mx-3" /> Loading...
    </div>
    <div v-else class="w-3/5 mx-auto my-10" style="height: 88vh">
      <div
        v-for="post in posts"
        :key="post._id"
        class="my-10 shadow shadow-2xl rounded rounded-lg p-5 bg-white"
      >
        <div class="flex items-center space-x-5">
          <UserIcon class="w-14 rounded rounded-full p-3 bg-gray-400" />
          <div>
            <h2 class="font-semibold text-xl">{{ post.userId.userName }}</h2>
            <p class="text-sm text-gray-600 font-semibold">{{ formatDate(post.createdAt) }}</p>
          </div>
        </div>
        <h3 class="text-2xl font-bold mt-5 mb-3">{{ post.title }}</h3>
        <p class="text-gray-800 text-lg">{{ post.description }}</p>
        <hr class="my-3" />
        <div class="font-semibold flex items-center">
          <HeartOutlineIcon class="w-8 text-red-600 cursor-pointer mx-2" v-if="false" />
          <HeartIcon class="w-8 text-red-600 cursor-pointer mx-2" v-else />
          {{ post.likesCount }} Like |
          <ChatBubbleBottomCenterTextIcon
            class="w-8 text-green-600 cursor-pointer mx-2"
            @click="isComment = !isComment"
          />
          {{ post.commentsCount }} Comment
        </div>
        <div v-if="isComment">
          <hr class="my-3" />
          <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl">Comments</h2>
            <XMarkIcon
              class="w-14 rounded rounded-full p-3 cursor-pointer hover:bg-gray-100"
              @click="isComment = false"
            />
          </div>
          <div>
            <div
              v-for="i in 2"
              :key="i"
              class="border border-gray-200 shadow shadow-sm rounded rounded-xl p-3 m-5 bg-slate-50"
            >
              <CommentBox />

              <div
                v-for="i in 2"
                :key="i"
                class="border border-gray-200 shadow shadow-sm rounded rounded-xl p-3 m-5 bg-white"
              >
                <CommentBox :is-nested="false" />
              </div>
            </div>
            <hr class="my-3" />
          </div>
          <PostComment @addComment="(text) => addComment(post._id, text)" />
        </div>
      </div>
    </div>
  </div>
</template>
