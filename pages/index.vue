<script setup lang="ts">
import { ConfirmEventKey, injectStrict } from '@/utils/types'

const { show } = injectStrict(ConfirmEventKey)
definePageMeta({
  auth: {
    unauthenticatedOnly: true
  }
})
</script>

<template>
  <h1>{{ $t('welcome.title') }}</h1>
  <h3>{{ $t('welcome.text') }}</h3>
  <v-btn @click="show({ message: 'some message here', color: 'primary' })">
    Show
  </v-btn>
</template>

<style scoped>

</style>
