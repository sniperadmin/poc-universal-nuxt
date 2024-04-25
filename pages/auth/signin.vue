<script setup lang="ts">
import { useApiServiceStore } from '~/store/api-service'
import { useApiServices } from '~/composables/api-services'
import { ZodError } from 'zod'
import { FirebaseError } from '@firebase/util'

const username = ref('testuser')
const email = ref('test-demo@meow.ww')
const password = ref('Test*123')
const { isRest, isFirebase } = useApiServiceStore()
const { status, signOut, getSession, data, lastRefreshedAt } = useAuth()
const session = await getSession()

async function signInWithCredentials() {
  //  call composable here
  const {loaderFunction} = useApiServices()
  const {loginWithCreds} = loaderFunction()
  const res: boolean | ZodError | FirebaseError = await loginWithCreds({ email: email.value, password: password.value })
  if (res instanceof ZodError || res instanceof FirebaseError) {
    console.log(res)
    //  TODO: show the error in the UI somehow
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

  <div class="max-w-5xl mx-auto mt-5 px-5">
    <h3 class="text-xl font-bold ">Authentication Overview</h3>
    <pre>Status: <span data-testid="status">{{ status }}</span></pre>
    <pre>Session: <span data-testid="session">{{ session }}</span></pre>
    <pre>Data: {{ data || 'no session data present, are you logged in?' }}</pre>
    <pre>Last refreshed at: {{ lastRefreshedAt || 'no refresh happened' }}</pre>
  </div>
</template>

<style scoped>

</style>
