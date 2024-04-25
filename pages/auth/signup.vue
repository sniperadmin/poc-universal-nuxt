<script setup lang="ts">
import { useApiServices } from '~/composables/api-services'
import { ZodError } from 'zod'
import { FirebaseError } from '@firebase/util'

const username = ref('testuser')
const email = ref('test-journalist-4@mailto.plus')
const password = ref('Test*123')

const signUpWithCredentials = async () => {
  const { loaderFunction } = useApiServices()
  const { signUpWithCreds } = loaderFunction()
  const res: boolean | ZodError | FirebaseError = await signUpWithCreds({ email: email.value, password: password.value })
  if (res instanceof ZodError || res instanceof FirebaseError) {
    console.log(res)
    //  TODO: show the errors in the UI somehow
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
  <p>{{$t('welcome.title')}}</p>
  <input v-model="username" type="text" placeholder="username" />
  <input v-model="email" type="email" placeholder="email" />
  <input v-model="password" type="password" placeholder="password" />
  <button @click="signUpWithCredentials">
    signup
  </button>
</template>

<style scoped>

</style>
