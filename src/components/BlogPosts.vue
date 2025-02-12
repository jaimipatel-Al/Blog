<script setup lang="ts">
import {
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  XMarkIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/vue/24/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/vue/24/outline'
import CommentBox from '@/components/CommentBox.vue'
import PostComment from '@/components/PostComment.vue'
import { onMounted, ref } from 'vue'
import Axios from '@/plugin/axios'
import api from '@/plugin/apis'
import { formatDate } from '@/composables/format'
import toast from '@/plugin/toast'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

const authStore = useAuthStore()

const isLoading = ref(false)
const posts = ref([])

const getPost = async () => {
  isLoading.value = true

  await Axios.get(`${api.postList}?page=1&limit=25`)
    .then((response) => {
      const res = response.data
      posts.value = res.data.map((e) => {
        return { ...e, isComment: false, isAddingComment: false }
      })
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      isLoading.value = false
    })
}

const getComment = async (post) => {
  post.isCommentLoading = true

  await Axios.get(`${api.getComments}${post._id}`)
    .then((response) => {
      const res = response.data
      post.comments = res.data.map((e) => {
        return { ...e, isAddingComment: false }
      })
      console.log(post.comments)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      post.isCommentLoading = false
    })
}

const addComment = async (post, text: string) => {
  post.isAddingComment = true

  const comment = {
    postId: post._id,
    text: text,
  }

  await Axios.post(api.addComment, comment)
    .then((response) => {
      const res = response.data
      toast.success(res?.message ?? 'Comment Post Success!')
      getComment(post, true)
      return true
    })
    .catch((er) => {
      toast.error(er?.response?.data?.message ?? "Comment Can't Post!")
      return false
    })
    .finally(() => {
      post.isAddingComment = false
    })
}

const likePost = async (post) => {
  post.isLiked = !post.isLiked

  const payload = {
    targetId: post._id,
    type: 'post',
  }
  await Axios.post(api.likes, payload)
    .then((response) => {
      const res = response.data.data
      post.likesCount = res
    })
    .catch((er) => {
      console.log(er)
    })
}

const deletePost = async (post) => {
  post.isDeleting = true

  await Axios.delete(`${api.deletePost}${post._id}`)
    .then((response) => {
      const res = response.data
      toast.success(res?.message ?? 'Post Deleted Success!')
      getPost()
    })
    .catch((er) => {
      console.log(er)
    })
    .finally(() => {
      post.isDeleting = false
    })
}

const editPost = async (id: string) => {
  router.push(`/edit-blog/${id}`)
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
    <div v-else-if="posts.length" class="w-3/5 mx-auto my-10" style="height: 88vh">
      <div
        v-for="post in posts"
        :key="post._id"
        class="my-10 shadow shadow-2xl rounded rounded-lg p-5 bg-white"
      >
        <div class="flex justify-between">
          <div class="flex items-center space-x-5">
            <UserIcon class="w-14 rounded rounded-full p-3 bg-gray-400" />
            <div>
              <h2 class="font-semibold text-xl">{{ post.user.userName }}</h2>
              <p class="text-sm text-gray-600 font-semibold">{{ formatDate(post.createdAt) }}</p>
            </div>
          </div>
          <div v-if="authStore?.userData?.userId == post.userId" class="flex">
            <TrashIcon
              v-if="!post?.isDeleting"
              class="text-red-600 w-14 h-12 py-2 px-3 hover:bg-gray-200 rounded rounded-full cursor-pointer"
              @click="deletePost(post)"
            />
            <ArrowPathIcon
              v-else
              class="text-red-400 w-14 h-12 py-2 px-3 hover:bg-gray-200 rounded rounded-full cursor-pointer"
            />
            <PencilIcon
              class="text-blue-600 w-14 h-12 py-2 px-3 hover:bg-gray-200 rounded rounded-full cursor-pointer"
              @click="editPost(post._id)"
            />
          </div>
        </div>
        <h3 class="text-2xl font-bold mt-5 mb-3">{{ post.title }}</h3>
        <p class="text-gray-800 text-lg">{{ post.description }}</p>
        <hr class="my-3" />
        <div class="font-semibold flex items-center">
          <HeartIcon
            v-if="post.isLiked"
            class="w-8 text-red-600 cursor-pointer mx-2"
            @click="likePost(post)"
          />
          <HeartOutlineIcon
            v-else
            class="w-8 text-red-600 cursor-pointer mx-2"
            @click="likePost(post)"
          />
          {{ post.likesCount }} Like |
          <ChatBubbleBottomCenterTextIcon
            class="w-8 text-green-600 cursor-pointer mx-2"
            @click="!post.isComment ? getComment(post) : '', (post.isComment = true)"
          />
          {{ post.commentsCount }} Comment
        </div>
        <div v-if="post.isComment">
          <hr class="my-3" />
          <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl">Comments</h2>
            <XMarkIcon
              class="w-14 rounded rounded-full p-3 cursor-pointer hover:bg-gray-100"
              @click="post.isComment = false"
            />
          </div>
          <div
            v-if="post.isCommentLoading"
            class="flex justify-center items-center text-md font-semibold text-gray-500 mb-5"
          >
            <ArrowPathIcon class="w-6 mx-3" /> Loading...
          </div>
          <div v-else>
            <div
              v-for="comment in post.comments"
              :key="comment._id"
              class="border border-gray-200 shadow shadow-sm rounded rounded-xl p-3 m-5 bg-slate-50"
            >
              <CommentBox :comment="comment" :postId="post._id" />

              <div
                v-if="comment.isComment"
                v-for="reply in comment.replies"
                :key="reply._id"
                class="border border-gray-200 shadow shadow-sm rounded rounded-xl p-3 m-5 bg-white"
              >
                <CommentBox :is-nested="false" :comment="reply" :postId="post._id" />
              </div>
            </div>
            <hr class="my-3" />
          </div>
          <PostComment
            @addComment="(text) => addComment(post, text)"
            :loading="post.isAddingComment"
          />
        </div>
      </div>
    </div>
    <div v-else class="text-center text-xl m-5 font-semibold">
      <img src="@/assets/img/empty.png" alt="Login" class="h-96 w-auto mx-auto my-5" />
      <p class="text-gray-700">No Post Avaiable</p>
      <RouterLink to="/add-blog" class="text-blue-700 underline">Add New Post</RouterLink>
    </div>
  </div>
</template>
