<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheSnackbarProvider'
})
</script>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { ConfirmEventKey } from '@/utils/types'
import { mdiCloseCircle } from '@mdi/js'

const show = ref(false)
const message = ref('')
const color = ref('')

provide(ConfirmEventKey, {
  show(options) {
    message.value = options.message
    color.value = options.color
    show.value = true
  },
  hide() {
    show.value = false
  }
})
</script>

<template>
  <slot />
  <v-snackbar v-model="show" :color="color" variant="plain" location="top" multi-line>
    {{ message }}
    <template #actions>
      <v-btn variant="plain" :color="color" :icon="mdiCloseCircle" @click="show = false" />
    </template>
  </v-snackbar>
</template>
