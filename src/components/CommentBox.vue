<script setup lang="ts">
import { HeartIcon, ChatBubbleBottomCenterTextIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { UserIcon, HeartIcon as HeartOutlineIcon } from '@heroicons/vue/24/outline'
import PostComment from '@/components/PostComment.vue'
import { ref } from 'vue'
import { formatDate } from '@/composables/format'

const isComment: boolean = ref(false)

const props = defineProps({
  comment: { type: Object, default: () => {} },
  isNested: { type: Boolean, default: true },
})
</script>

<template>
  <div v-if="comment">
    <div class="flex items-center space-x-3">
      <UserIcon class="w-10 rounded rounded-full p-2 bg-gray-200 border border-gray-500" />
      <div>
        <h2 class="font-semibold text-md">{{ comment.userId }}</h2>
        <p class="text-xs text-gray-600 font-semibold">{{ formatDate(comment.createdAt) }}</p>
      </div>
    </div>
    <p class="text-lg my-3">{{ comment.text }}</p>
    <div class="font-semibold flex items-center">
      <HeartOutlineIcon class="w-6 text-red-5600 cursor-pointer mx-2" v-if="false" />
      <HeartIcon class="w-6 text-red-600 cursor-pointer mx-2" v-else />
      {{ comment.likesCount }} Like
      <span v-if="props.isNested"> | </span>
      <ChatBubbleBottomCenterTextIcon
        v-if="props.isNested"
        class="w-6 text-green-600 cursor-pointer mx-2"
        @click="isComment = !isComment"
      />
      <span v-if="props.isNested">{{ comment.repliesCount }} Comment</span>
    </div>
    <div
      v-if="isComment"
      class="p-3 flex justify-between items-start border-b border-t border-gray-300 m-5"
    >
      <PostComment v-if="props.isNested" class="ml-5 w-full" />
      <XMarkIcon
        class="w-10 rounded rounded-full p-2 cursor-pointer bg-gray-300 ml-2 hover:bg-gray-400"
        @click="isComment = false"
      />
    </div>
  </div>
</template>
