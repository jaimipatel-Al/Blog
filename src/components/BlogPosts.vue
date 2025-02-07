<script setup lang="ts">
import {
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  HeartIcon,
  XMarkIcon,
} from '@heroicons/vue/24/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/vue/24/outline'
import CommentBox from '@/components/CommentBox.vue'
import PostComment from '@/components/PostComment.vue'
import { ref } from 'vue'

const isComment: boolean = ref(false)
</script>

<template>
  <div class="w-full overflow-y-auto" style="height: 88vh">
    <div class="w-3/5 mx-auto my-10" style="height: 88vh">
      <div class="my-10 shadow shadow-2xl rounded rounded-lg p-5 bg-white">
        <div class="flex items-center space-x-5">
          <UserIcon class="w-14 rounded rounded-full p-3 bg-gray-400" />
          <div>
            <h2 class="font-semibold text-xl">jaimip.albiorix@gmail.com</h2>
            <p class="text-sm text-gray-600 font-semibold">Feb 7, 2025, 3:13:17 PM</p>
          </div>
        </div>
        <h3 class="text-2xl font-bold mt-5 mb-3">Syntax support</h3>
        <p class="text-gray-800 text-lg">
          Tailwind CSS uses custom CSS syntax like @theme, @variant, and @source, and in some
          editors this can trigger warnings or errors where these rules aren't recognized. If you're
          using VS Code, our official Tailwind CSS IntelliSense plugin includes a dedicated Tailwind
          CSS language mode that has support for all of the custom at-rules and functions Tailwind
          uses.
        </p>
        <hr class="my-3" />
        <div class="font-semibold flex items-center">
          <HeartOutlineIcon class="w-8 text-red-600 cursor-pointer mx-2" v-if="i % 2" />
          <HeartIcon class="w-8 text-red-600 cursor-pointer mx-2" v-else />
          0 Like |
          <ChatBubbleBottomCenterTextIcon
            class="w-8 text-green-600 cursor-pointer mx-2"
            @click="isComment = !isComment"
          />
          0 Comment
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
          <PostComment />
        </div>
      </div>
    </div>
  </div>
</template>
