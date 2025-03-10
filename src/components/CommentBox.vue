<script setup>
  import { HeartIcon, XMarkIcon, TrashIcon } from '@heroicons/vue/24/solid'
  import {
    UserIcon,
    ArrowPathIcon,
    ChatBubbleBottomCenterTextIcon,
    HeartIcon as HeartOutlineIcon,
  } from '@heroicons/vue/24/outline'
  import PostComment from '@/components/PostComment.vue'
  import { formatDate } from '@/composables/format'
  import Axios from '@/plugin/axios'
  import api from '@/plugin/apis'
  import toast from '@/plugin/toast'
  import { useAuthStore } from '@/stores/authStore'

  const authStore = useAuthStore()

  const props = defineProps({
    comment: { type: Object, default: () => { } },
    isNested: { type: Boolean, default: true },
    postId: { type: String, default: null },
  })

  const emit = defineEmits(['getComment', 'reLoadReplay'])

  const likeComment = async () => {
    props.comment.isLiked = !props.comment.isLiked

    const payload = {
      targetId: props.comment._id,
      type: props.isNested ? 'comment' : 'reply',
    }
    await Axios.post(api.likes, payload)
      .then((response) => {
        const res = response.data.data
        props.comment.likesCount = res
      })
      .catch((er) => {
        console.log(er)
      })
  }

  const addReplay = async (text) => {
    props.comment.isAddingComment = true

    const payload = {
      postId: props.postId,
      commentId: props.comment._id,
      text: text,
    }

    await Axios.post(api.addReply, payload)
      .then((response) => {
        const res = response.data
        props.comment.replies = res?.data ?? []
        props.comment.repliesCount = res?.data?.length ?? 0

        toast.success(res?.message ?? 'Comment Post Success!')
        return true
      })
      .catch((er) => {
        toast.error(er?.response?.data?.message ?? "Comment Can't Post!")
        return false
      })
      .finally(() => {
        props.comment.isAddingComment = false
      })
  }

  const deleteComment = async () => {
    props.comment.isDeleting = true

    await Axios.delete(`${api.deleteComment}${props.comment._id}`)
      .then((response) => {
        const res = response.data
        emit('getComment')
        toast.success('Comment Deleted Success!')
      })
      .catch((er) => {
        console.log(er)
      })
      .finally(() => {
        props.comment.isDeleting = false
      })
  }

  const deleteReply = async () => {
    props.comment.isDeleting = true

    await Axios.delete(`${api.deleteReply}${props.comment._id}`)
      .then((response) => {
        const res = response.data.data
        emit('reLoadReplay', res)
        toast.success('Comment Deleted Success!')
      })
      .catch((er) => {
        console.log(er)
      })
      .finally(() => {
        props.comment.isDeleting = false
      })
  }
</script>

<template>
  <div v-if="comment">
    <div class="flex justify-between">
      <div class="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
        <UserIcon class="w-7 sm:w-8 md:w-10 rounded rounded-full p-1 md:p-2 bg-gray-200 border border-gray-500" />
        <div>
          <h2 class="font-semibold text-xs sm:text-sm md:text-base">{{ comment.userId.userName }}</h2>
          <p class="text-xs text-gray-600 sm:font-semibold">{{ formatDate(comment.createdAt) }}</p>
        </div>
      </div>
      <div class="flex" v-if="authStore?.userData?.userId == comment.userId?._id">
        <TrashIcon v-if="!comment?.isDeleting" @click="isNested ? deleteComment() : deleteReply()"
          class="text-red-500 w-8 sm:w-10 md:w-12 h-7 sm:h-8 md:h-10 py-1 sm:py-2 px-1 sm:px-2 md:px-3 hover:bg-white hover:shadow hover:shadow-xl rounded rounded-full cursor-pointer" />
        <ArrowPathIcon v-else
          class="text-red-400 w-8 sm:w-10 md:w-12 h-7 sm:h-8 md:h-10 py-1 sm:py-2 px-1 sm:px-2 md:px-3 rounded rounded-full" />
      </div>
    </div>
    <p class="text-sm sm:text-base md:text-lg my-2 sm:my-3">{{ comment.text }}</p>
    <div class="text-xs sm:text-sm md:text-base font-semibold flex items-center">
      <HeartIcon v-if="comment?.isLiked" class="w-4 sm:w-5 md:w-6 text-red-600 cursor-pointer mx-1 sm:mx-2"
        @click="likeComment()" />
      <HeartOutlineIcon v-else class="w-4 sm:w-5 md:w-6 text-red-600 cursor-pointer mx-1 sm:mx-2"
        @click="likeComment()" />
      {{ comment.likesCount }} Like
      <span v-if="isNested"> | </span>
      <ChatBubbleBottomCenterTextIcon v-if="isNested"
        class="w-4 sm:w-5 md:w-6 text-green-600 cursor-pointer mx-1 sm:mx-2" @click="comment.isComment = true" />
      <span v-if="isNested">{{ comment.repliesCount }} Reply</span>
    </div>
    <div v-if="comment.isComment"
      class="p-1 sm:p-2 md:p-3 flex justify-between items-start border-b border-t border-gray-300 m-3 sm:m-4 md:m-5">
      <PostComment class="ml-2 sm:ml-3 md:ml-5 w-full" @addComment="addReplay" :loading="comment.isAddingComment" />
      <XMarkIcon
        class="w-7 sm:w-8 md:w-10 rounded rounded-full p-1 sm:p-2 cursor-pointer bg-gray-300 ml-1 sm:ml-2 hover:bg-gray-400"
        @click="comment.isComment = false" />
    </div>
  </div>
</template>
