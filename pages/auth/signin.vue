<script setup lang="ts">
import { useApiServiceStore } from '~/store/api-service'
import { useApiServices } from '~/composables/api-services'

const username = ref('testuser')
const email = ref('test-demo@meow.ww')
const password = ref('Test*123')
const { isRest, isFirebase } = useApiServiceStore()
const { signIn, status, signOut } = useAuth()

async function signInWithCredentials() {
  //  call composable here
  const {loaderFunction} = useApiServices()
  if (isFirebase) {
    const {loginWithCreds} = loaderFunction()
    await loginWithCreds({ email: email.value, password: password.value })
  } else {
    await signIn({ identifier: username.value, email: email.value, password: password.value })
  }
}

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/protected/home'
  }
})
</script>

<template>
  <input v-if="isRest" v-model="username" type="text" placeholder="username" />
  <input v-model="email" type="email" placeholder="email" />
  <input v-model="password" type="password" placeholder="password" />
  <button @click="status === 'authenticated' ? signOut({ redirect: false }) : signInWithCredentials()">
    {{ status === 'authenticated' ? 'logout' : 'login' }}
  </button>
</template>

<style scoped>

</style>
