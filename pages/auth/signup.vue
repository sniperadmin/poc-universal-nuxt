<script setup lang="ts">
import { useApiServices } from '~/composables/api-services'

const username = ref('testuser')
const email = ref('test-journalist-4@mailto.plus')
const password = ref('Test*123')

const signUpWithCredentials = async () => {
  const { loaderFunction } = useApiServices()
  const { signUpWithCreds } = loaderFunction()
  await signUpWithCreds({ email: email.value, password: password.value })
}

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/protected/home'
  }
})
</script>

<template>
  <input v-model="username" type="text" placeholder="username" />
  <input v-model="email" type="email" placeholder="email" />
  <input v-model="password" type="password" placeholder="password" />
  <button @click="signUpWithCredentials">
    signup
  </button>
</template>

<style scoped>

</style>
