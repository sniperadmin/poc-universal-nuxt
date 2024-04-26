<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true
  }
})
</script>

<template>
  <h1>{{ $t('welcome.title') }}</h1>
  <h3>{{ $t('welcome.text') }}</h3>
</template>

<style scoped>

</style>
