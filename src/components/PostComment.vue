<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'

const emit = defineEmits(['addComment'])

const schema = yup.object({
  Comment: yup.string().required().max(100),
})

const comment = ref('')
const formRef = ref()

const sendComment = async () => {
  await emit('addComment', comment.value)
  formRef.value.resetForm()
}
</script>

<template>
  <Form ref="formRef" @submit="sendComment" :validation-schema="schema" v-slot="{ errors }">
    <Field v-model="comment" v-slot="{ field }" name="Comment">
      <textarea v-bind="field" class="input h-32" placeholder="Enter Your Comment"></textarea>
    </Field>
    <p class="error-message">{{ errors?.Comment }}</p>

    <div class="flex justify-end">
      <button type="submit" class="sm-button">Add Comment</button>
    </div>
  </Form>
</template>
