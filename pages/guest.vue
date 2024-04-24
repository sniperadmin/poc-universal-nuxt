<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/protected/home'
  }
})
</script>

<template>
  <h1>This is a guest page, authenticated users will go to home by default</h1>
</template>

<style scoped>

</style>
