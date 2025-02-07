<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  Comment: yup.string().required().max(100),
})

const sendComment = () => {}
</script>

<template>
  <Form @submit="sendComment" :validation-schema="schema" v-slot="{ errors }">
    <Field v-slot="{ field }" name="Comment">
      <textarea v-bind="field" class="input h-32" placeholder="Enter Your Comment"></textarea>
    </Field>
    <p class="error-message">{{ errors?.Comment }}</p>

    <div class="flex justify-end">
      <button type="submit" class="sm-button">Add Comment</button>
    </div>
  </Form>
</template>
