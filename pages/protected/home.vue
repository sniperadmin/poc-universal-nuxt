<script setup lang="ts">
import { useApiServices } from '~/composables/api-services'

const { status, getSession, data, lastRefreshedAt } = useAuth()
const session = await getSession()

const signOutUser = async () => {
  const {loaderFunction} = useApiServices()
  const {logout} = loaderFunction()
  await logout()
}
</script>

<template>
  <div>I'm a secret! My protection works via a global middleware. If you turned off the global middleware, then I'll also be visible without authentication :(</div>

  <div class="max-w-5xl mx-auto mt-5 px-5">
    <h3 class="text-xl font-bold ">Authentication Overview</h3>
    <pre>Status: <span data-testid="status">{{ status }}</span></pre>
    <pre>Session: <span data-testid="session">{{ session }}</span></pre>
    <pre>Data: {{ data || 'no session data present, are you logged in?' }}</pre>
    <pre>Last refreshed at: {{ lastRefreshedAt || 'no refresh happened' }}</pre>
  </div>
  <button v-if="status === 'authenticated'" @click="signOutUser">logout</button>
</template>

<style scoped>

</style>
