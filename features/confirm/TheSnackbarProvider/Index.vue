<script setup lang="ts">
import { provide, ref } from 'vue';
import { ConfirmEventKey, type IConfirmProps } from '@/utils/types'
import { mdiCloseCircle } from '@mdi/js'

const show = ref(false)
const message = ref('')
const color = ref('')
const location = ref('')

provide(ConfirmEventKey, {
  show(options: IConfirmProps) {
    message.value = options.message
    color.value = options.color
    show.value = true
    location.value = options.location
  },
  hide() {
    show.value = false
  }
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheSnackbarProvider'
})
</script>

<template>
  <slot />
  <v-snackbar v-model="show" :color="color" variant="plain" :location="location" multi-line>
    {{ message }}
    <template #actions>
      <v-btn variant="plain" :color="color" :icon="mdiCloseCircle" @click="show = false" />
    </template>
  </v-snackbar>
</template>
