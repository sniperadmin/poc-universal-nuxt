<script setup lang="ts">
import { VSnackbarQueue } from 'vuetify/labs/VSnackbarQueue'
import { useSnackbarStore } from '@/store/snackbar'
import { mdiCloseOutline } from '@mdi/js'

const { queue, removeSnackbar } = useSnackbarStore()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheSnackbarProvider'
})
</script>

<template>
  <v-snackbar-queue :model-value="queue" multi-line closable>
    <template #actions="{ props }">
      <v-btn v-bind="props" :icon="mdiCloseOutline" @click="removeSnackbar"></v-btn>
    </template>
  </v-snackbar-queue>
</template>
