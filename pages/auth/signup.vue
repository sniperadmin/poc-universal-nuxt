<script setup lang="ts">
import { EAuth } from '@/features/authentication'

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/protected/home'
  }
})
</script>

<template>
  <e-auth :is-editor="false" />
</template>

<style scoped>

</style>
