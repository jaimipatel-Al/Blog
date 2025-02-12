<script setup lang="ts">
import {
  HeartIcon,
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/vue/24/solid'
import { UserIcon, HeartIcon as HeartOutlineIcon } from '@heroicons/vue/24/outline'
import PostComment from '@/components/PostComment.vue'
import { ref } from 'vue'
import { formatDate } from '@/composables/format'
import Axios from '@/plugin/axios'
import api from '@/plugin/apis'
import toast from '@/plugin/toast'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const props = defineProps({
  comment: { type: Object, default: () => {} },
  isNested: { type: Boolean, default: true },
  postId: { type: String, default: null },
})

const likeComment = async () => {
  props.comment.isLiked = !props.comment.isLiked

  const payload = {
    targetId: props.comment._id,
    type: props.isNested ? 'comment' : 'reply',
  }
  await Axios.post(api.likes, payload)
    .then(() => {})
    .catch((er) => {
      console.log(er)
    })
}

const addReplay = async (text: string) => {
  props.comment.isAddingComment = true

  const payload = {
    postId: props.postId,
    commentId: props.comment._id,
    text: text,
  }

  await Axios.post(api.addReply, payload)
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
      props.comment.isAddingComment = false
    })
}
</script>

<template>
  <div v-if="comment">
    <div class="flex justify-between">
      <div class="flex items-center space-x-3">
        <UserIcon class="w-10 rounded rounded-full p-2 bg-gray-200 border border-gray-500" />
        <div>
          <h2 class="font-semibold text-md">{{ comment.userId.userName }}</h2>
          <p class="text-xs text-gray-600 font-semibold">{{ formatDate(comment.createdAt) }}</p>
        </div>
      </div>
      <div class="flex" v-if="authStore?.userData?.userId == comment.userId">
        <TrashIcon
          class="text-red-500 w-12 h-10 py-2 px-3 hover:bg-white hover:shadow hover:shadow-xl rounded rounded-full cursor-pointer"
        />
        <PencilIcon
          class="text-blue-500 w-12 h-10 py-2 px-3 hover:bg-white hover:shadow hover:shadow-xl rounded rounded-full cursor-pointer"
        />
      </div>
    </div>
    <p class="text-lg my-3">{{ comment.text }}</p>
    <div class="font-semibold flex items-center">
      <HeartIcon
        v-if="comment?.isLiked"
        class="w-6 text-red-600 cursor-pointer mx-2"
        @click="likeComment()"
      />
      <HeartOutlineIcon
        v-else
        class="w-6 text-red-600 cursor-pointer mx-2"
        @click="likeComment()"
      />
      {{ comment.likesCount }} Like
      <span v-if="props.isNested"> | </span>
      <ChatBubbleBottomCenterTextIcon
        v-if="props.isNested"
        class="w-6 text-green-600 cursor-pointer mx-2"
        @click="comment.isComment = true"
      />
      <span v-if="props.isNested">{{ comment.repliesCount }} Comment</span>
    </div>
    <div
      v-if="comment.isComment"
      class="p-3 flex justify-between items-start border-b border-t border-gray-300 m-5"
    >
      <PostComment class="ml-5 w-full" @addComment="addReplay" :loading="comment.isAddingComment" />
      <XMarkIcon
        class="w-10 rounded rounded-full p-2 cursor-pointer bg-gray-300 ml-2 hover:bg-gray-400"
        @click="comment.isComment = false"
      />
    </div>
  </div>
</template>
