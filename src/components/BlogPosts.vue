<script setup>
  import {
    UserIcon,
    HeartIcon,
    XMarkIcon,
    ArrowPathIcon,
    TrashIcon,
    PencilIcon,
  } from '@heroicons/vue/24/solid'
  import {
    HeartIcon as HeartOutlineIcon,
    ChatBubbleBottomCenterTextIcon,
  } from '@heroicons/vue/24/outline'
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
  const page = ref(0)
  const totalPost = ref()
  const scrollComponent = ref()

  const getPost = async () => {
    if (posts.value?.length == totalPost.value) return

    page.value++
    isLoading.value = true

    await Axios.get(`${api.postList}?page=${page.value}&limit=5`)
      .then((response) => {
        const res = response.data.data
        totalPost.value = res.totalPosts
        const arr = res.posts.map((e) => {
          return { ...e, isComment: false, isAddingComment: false }
        })
        posts.value = [...posts.value, ...arr]
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const handleScroll = () => {
    const element = scrollComponent.value
    if (element.getBoundingClientRect().bottom < window.innerHeight && !isLoading.value) getPost()
  }

  const getComment = async (post) => {
    post.isCommentLoading = true

    await Axios.get(`${api.getComments}${post._id}`)
      .then((response) => {
        const res = response.data.data
        post.comments = res.commentsTree.map((e) => {
          return { ...e, isAddingComment: false }
        })
        post.commentsCount = res.totalComments
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        post.isCommentLoading = false
      })
  }

  const addComment = async (post, text) => {
    post.isAddingComment = true

    const comment = {
      postId: post._id,
      text: text,
    }

    await Axios.post(api.addComment, comment)
      .then((response) => {
        const res = response.data
        getComment(post)
        toast.success(res?.message ?? 'Comment Post Success!')
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
        posts.value = []
        page.value = 0
        totalPost.value = 0
        getPost()
      })
      .catch((er) => {
        console.log(er)
      })
      .finally(() => {
        post.isDeleting = false
      })
  }

  const editPost = async (id) => {
    router.push(`/edit-blog/${id}`)
  }

  onMounted(() => {
    scrollComponent.value.addEventListener('scroll', handleScroll)
    getPost()
  })
</script>

<template>
  <div class="scrolling-component w-full pb-10 overflow-y-auto px-3 sm:px-0" ref="scrollComponent" style="height: 88vh">
    <div v-if="posts.length" class="w-full sm:w-3/5 mx-auto may-10">
      <div v-for="post in posts" :key="post._id"
        class="may-10 shadow shadow-2xl rounded rounded-lg p-3 sm:p-4 md:p-5 bg-white">
        <div class="flex justify-between">
          <div class="flex items-center space-x-2 sm:space-x-4 md:space-x-5">
            <UserIcon class="w-10 sm:w-12 md:w-14 rounded rounded-full p-1 sm:p-2 md:p-3 bg-gray-400" />
            <div>
              <h2 class="font-semibold text-base sm:text-lg md:text-xl">{{ post.user.userName }}</h2>
              <p class="text-xs sm:text-sm text-gray-600 font-semibold">{{ formatDate(post.createdAt) }}</p>
            </div>
          </div>
          <div v-if="authStore?.userData?.userId == post.userId" class="flex">
            <TrashIcon v-if="!post?.isDeleting"
              class="text-red-600 w-8 h-8 sm:w-12 sm:h-10  md:w-14 md:h-12 py-0.5 px-1 sm:py-1 sm:px-3 md:py-2 md:px-3 hover:bg-gray-200 rounded rounded-full cursor-pointer"
              @click="deletePost(post)" />
            <ArrowPathIcon v-else
              class="text-red-400 w-8 h-8 sm:w-12 sm:h-10  md:w-14 md:h-12 py-0.5 px-1 sm:py-1 sm:px-3 md:py-2 md:px-3 rounded rounded-full" />
            <PencilIcon
              class="text-blue-600 w-8 h-8 sm:w-12 sm:h-10  md:w-14 md:h-12 py-0.5 px-1 sm:py-1 sm:px-3 md:py-2 md:px-3 hover:bg-gray-200 rounded rounded-full cursor-pointer"
              @click="editPost(post._id)" />
          </div>
        </div>
        <h3 class="text-lg sm:text-xl md:text-2xl font-bold mt-2 sm:mt-3 md:mt-5 mb-1 sm:mb-2 md:mb-3">{{ post.title }}
        </h3>
        <p class="text-gray-800 text-sm sm:text-base md:text-lg">{{ post.description }}</p>
        <hr class="my-1 sm:my-2 md:my-3" />
        <div class="font-semibold flex items-center text-xs sm:text-sm md:text-base">
          <HeartIcon v-if="post.isLiked" class="w-5 sm:w-7 md:w-8 text-red-600 cursor-pointer mx-1 sm:mx-2"
            @click="likePost(post)" />
          <HeartOutlineIcon v-else class="w-5 sm:w-7 md:w-8 text-red-600 cursor-pointer mx-1 sm:mx-2"
            @click="likePost(post)" />
          {{ post.likesCount }} Like |
          <ChatBubbleBottomCenterTextIcon class="w-5 sm:w-7 md:w-8 text-green-600 cursor-pointer mx-1 sm:mx-2"
            @click="!post.isComment ? getComment(post) : '', (post.isComment = true)" />
          {{ post.commentsCount }} Comment
        </div>
        <div v-if="post.isComment">
          <hr class="my-1 sm:my-2 md:my-3" />
          <div class="flex justify-between items-center">
            <h2 class="font-semibold text-base sm:text-lg md:text-xl">Comments</h2>
            <XMarkIcon
              class="w-8 sm:w-12 md:w-14 rounded rounded-full p-1 sm:p-2 md:p-3 cursor-pointer hover:bg-gray-100"
              @click="post.isComment = false" />
          </div>
          <div v-if="post.isCommentLoading"
            class="flex justify-center items-center text-md font-semibold text-gray-500 mb-5">
            <ArrowPathIcon class="w-4 sm:w-5 md:w-6 mx-1 sm:mx-2 md:mx-3" /> Loading...
          </div>
          <div v-else>
            <div v-for="comment in post.comments" :key="comment._id"
              class="border border-gray-200 shadow shadow-sm rounded rounded-xl p-1 sm:p-2 md:p-3 m-2 sm:m-4 md:m-5 bg-slate-50">
              <CommentBox :comment="comment" :postId="post._id" @getComment="getComment(post)" />

              <div v-if="comment.isComment" v-for="reply in comment.replies" :key="reply._id"
                class="border border-gray-200 shadow shadow-sm rounded rounded-xl p-1 sm:p-2 md:p-3 m-2 sm:m-4 md:m-5 bg-white">
                <CommentBox :is-nested="false" :comment="reply" :postId="post._id"
                  @reLoadReplay="(val) => (comment.replies = val, comment.repliesCount = val?.length ?? 0)" />
              </div>
            </div>
            <hr class="my-1 sm:my-2 md:my-3" />
          </div>
          <PostComment @addComment="(text) => addComment(post, text)" :loading="post.isAddingComment" />
        </div>
      </div>
    </div>
    <div v-else-if="!posts.length && !isLoading" class="text-center text-base sm:text-lg md:text-xl m-5 font-semibold">
      <img src="@/assets/img/empty.png" alt="Login" class="h-64 sm:h-72 md:h-96 w-auto mx-auto my-3 sm:my-4 md:my-5" />
      <p class="text-gray-700">No Post Avaiable</p>
      <RouterLink to="/add-blog" class="text-blue-700 underline">Add New Post</RouterLink>
    </div>
    <div v-if="isLoading"
      class="flex justify-center items-center text-base sm:text-lg md:text-xl font-semibold ma-10 pb-10 sm:pb-16 md:pb-20 text-gray-500">
      <ArrowPathIcon class="w-8 sm:w-10 md:w-12 mx-1 sm:mx-2 md:mx-3" /> Loading...
    </div>
  </div>
</template>
