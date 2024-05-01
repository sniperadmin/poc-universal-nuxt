<script setup lang="ts">
import { useApiServices } from '@/composables/api-services'

const { status } = useAuth()

const signOutUser = async () => {
  const {logout} = useApiServices()
  await logout()
}
</script>

<template>
  <pre>
    Verify email address here
  </pre>
  <button v-if="status === 'authenticated'" @click="signOutUser">logout</button>
</template>

<style scoped>

</style>
