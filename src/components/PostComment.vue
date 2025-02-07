<script setup lang="ts">
const sendComment = () => {}
</script>

<template>
  <form @submit.prevent="sendComment">
    <textarea id="blog" class="input h-32" placeholder="Enter Your Blog Description"></textarea>
    <div class="flex justify-end">
      <button type="submit" class="sm-button">Add Comment</button>
    </div>
  </form>
</template>
