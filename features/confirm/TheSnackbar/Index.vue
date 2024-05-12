<script setup lang="ts">
import { VSnackbarQueue } from 'vuetify/labs/VSnackbarQueue'
import { useSnackbarStore } from '@/store/snackbar'
import { mdiCloseOutline } from '@mdi/js'

const { showNextSnackbar } = useSnackbarStore()
const { queue } = storeToRefs(useSnackbarStore())
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheSnackbarProvider'
})
</script>

<template>
  <v-snackbar-queue :model-value="queue" multi-line closable @update:model-value="showNextSnackbar">
    <template #actions="{ props }">
      <v-btn v-bind="props" :icon="mdiCloseOutline" @click="showNextSnackbar" />
    </template>
  </v-snackbar-queue>
</template>
