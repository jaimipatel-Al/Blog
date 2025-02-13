<script setup>
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  loading: { type: Boolean, default: true },
})
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
      <button
        type="submit"
        class="sm-button flex justify-center items-center"
        :disabled="props.loading"
      >
        Add Comment <ArrowPathIcon v-if="props.loading" class="w-6 ml-3" />
      </button>
    </div>
  </Form>
</template>
